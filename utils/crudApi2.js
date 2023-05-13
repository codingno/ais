import nc from "next-connect";

import db from "../models";
import police from "../pages/api/config/police";

function getAs(params, isId, query) {
  let includes = params.include;
	if(includes)
  includes.map((item) => {
    if (item.as) {
      // console.log(item.as);
      const detect = isId.filter((x) => x.as == item.as);
      if (detect[0]) {
				item.where = { id : detect[0].query };
				item.required = true
				// delete query[item.as + "_id"]
			}
    }
    if (item.include) getAs(item, isId);
  });
  return {...params, include : includes,};
}

function getAsArray(params, isId) {
  let includes = params.include;
	let results = []
	if(includes)
  results = includes.map((item) => {
		let result = []
    if (item.as) {
      console.log(item.as);
      const detect = isId.filter((x) => x.as == item.as);
      if (detect[0]) {
				// item.where = { id : detect[0].query };
				// item.required = true
				// delete query[item.as + "_id"]
				// result = [...result,detect[0].as]
				result.push(item.as)
			}
    }
    if (item.include) {
			const chidAs = getAsArray(item, isId)
			if(chidAs.length > 0)
				result.push(item.as)
			return [...result, ...chidAs]
		}
		else return result
  }).reduce((a,b) => [...a,...b],[]);
	return results
  // return {...params, include : includes,};
}

function removeRequired(params) {
  let includes = params.include;
	if(includes)
  includes.map((item) => {
    // if (item.as && item.required) {
		// 		delete item.required
    // }
    if (item.as && item.where) {
				delete item.where
    }
    if (item.include) removeRequired(item);
  });
  return {...params, include : includes,};
}

function addRequired(params, require) {
  let includes = params.include;
	if(includes)
  includes.map((item) => {
		const isRequired = require.indexOf(item.as) >= 0
		if(isRequired)
			item.required = true
    // if (item.as && item.required) {
		// 		delete item.required
    // }
    if (item.include) addRequired(item, require);
  });
  return {...params, include : includes,};
}

const handler = (tableName, getOptions, role, readOnly, customField, optionByUrl, additionalFunction ) => nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Server Error!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
})
  .use(police[role])
  .get(async (req, res) => {
		let query = {...req.query}
		Object.keys(query).map(x => {
			if(query[x].includes(','))
				query[x] = query[x].split(',')
		})
		let options = {...getOptions}
		options = removeRequired(options)
		let listColumn = {...db[tableName].rawAttributes}
		if(req.query.column_field) {
			const disabledColumn = !customField ? [] : customField?.filter(y => y.disable)?.map(y => y?.field)??[]
			Object.keys(listColumn).filter(function (x) { 
				if(this.indexOf(x) > -1)
					delete listColumn[x]
				return this.indexOf(x) < 0 } , [...disabledColumn]
			).map(x => listColumn[x] = null)
     	return res.send([listColumn])
		}
		if(Object.keys(req.query).length > 0) {
			const isId = [
				...Object.keys(req.query)
					.filter(item => Object.keys(listColumn).indexOf(item) < 0)	
					.filter((item) => {
						const split = item.split("_");
						return split[split.length - 1] === "id";
					})
					.map((item) => ({ as: item.split("_id")[0], query: req.query[item], key : item }))
			];
			if(isId.length > 0) {
				let testing = getAsArray(options, isId, req.query);
        console.log(`🚀 ~ file: crudApi.js ~ line 95 ~ .get ~ testing`, testing)
				let newOptions = addRequired(options, testing)
        console.log(`🚀 ~ file: crudApi.js ~ line 120 ~ .get ~ newOptions`, newOptions)
				options = getAs(getOptions, isId, req.query);
				isId.map(x => {
					const isExist = Object.keys(query).filter(y => y == x.key)[0]
					if(isExist)
						delete query[x.key]
				})
			}
		}
		let otherOptions = optionByUrl ? optionByUrl(req, options) : { where : { ...options.where, ...query} }
    // console.log(`🚀 ~ file: crudApi.js ~ line 72 ~ .get ~ options`, options)
    // console.log(`🚀 ~ file: crudApi.js ~ line 70 ~ .get ~ otherOptions`, otherOptions)
		Object.keys(query).map(x => { if(Object.keys(listColumn).indexOf(x) < 0) delete query[x]; })
		options = {
			...options,
			// where : {
			// 	...query,
			// 	...otherOptions,
			// },
			...otherOptions,
		}
		if(options.where)
			options.where = Object.keys(options.where).filter(function(x) { return this.indexOf(x) >= 0 }, Object.keys(listColumn)).reduce((a,v) => ({...a, [v] : options.where[v]}),{})
    // console.log(`🚀 ~ file: crudApi.js ~ line 72 ~ .get ~ options`, options)
    // console.log(`🚀 ~ file: crudApi.js ~ line 72 ~ .get ~ options`, JSON.stringify( options, null, 4))
			// return res.send([])
		try {
			let result = await db[tableName].findAll(options)	
			let data = JSON.parse(JSON.stringify(result))
			if(customField) {
				data.map(dt => 
					// Object.keys(customField).map(item => {
					// 	dt[item] = dt[customField[item]]
					// })
					customField.map(item => {
						if(item.disable)
							delete dt[item?.field]
						else if(item.name)
							dt[item.name] = dt[item?.field]
					})
				)
			}

			if(additionalFunction)
				data = await additionalFunction(req, data)

    	return res.send(data);
		} catch (error) {
      console.log(`🚀 ~ file: crudApi.js ~ line 46 ~ .get ~ error`, error)
			return res.status(500).send(error)	
		}
  })
  .post(async (req, res) => {
	if(readOnly)
		return res.status(403).send("You don't have permission to access this features")
		try {
			if(!req.body)
				throw new Error("Missing parameters!")
			if(!Array.isArray(req.body))
				throw new Error("Missing parameters!")
			// return res.send([])
			let listColumn = {...db[tableName].rawAttributes}
      console.log(`🚀 ~ file: crudApi.js ~ line 121 ~ .post ~ listColumn`, Object.keys(listColumn))
      // console.log(`🚀 ~ file: crudApi.js ~ line 121 ~ .post ~ req.body`, JSON.stringify(req.body,null,4))
			const prepareData = req.body.map(y => Object.keys(listColumn).map(x => ({ [x] : y[x] })) 
			.reduce((a,b) => ({...a,...b}),{})
			)
      console.log(`🚀 ~ file: crudApi.js ~ line 123 ~ .post ~ prepareData`, prepareData)
      // console.log(`🚀 ~ file: crudApi.js ~ line 122 ~ .post ~ prepareData`, JSON.stringify(prepareData,null,4))
			// const data = {}
			// const data = await db[tableName].bulkCreate(prepareData, { updateOnDuplicate : Object.keys(listColumn), individualHooks: true })	
			const data = await db[tableName].bulkCreate(req.body, { updateOnDuplicate : Object.keys(listColumn)})	
      console.log(`🚀 ~ file: crudApi.js ~ line 121 ~ .post ~ data`, data)
			// const data = await db[tableName].bulkCreate(req.body, { updateOnDuplicate : ["id"]})	
    	res.send(data);
		} catch (error) {
      console.log(`🚀 ~ file: crudApi.js ~ line 104 ~ .post ~ error`, error)
			res.status(500).send(error.toString())	
		}
  })
  .patch(async (req, res) => {
	if(readOnly)
		return res.status(403).send("You don't have permission to access this features")
		try {
			if(!req.body || !req.body.id)
				throw new Error("Missing parameters!")
			const data = await db[tableName].update(req.body, {
				where : {
					id : req.body.id,
				}
			})	
    	res.send(data);
		} catch (error) {
      console.log(`🚀 ~ file: component.js ~ line 40 ~ .patch ~ error`, error)
			res.status(500).send(error)	
		}
  });

export default handler;
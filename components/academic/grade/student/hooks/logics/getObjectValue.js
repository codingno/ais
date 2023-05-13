export default function getObjectValue(source, objects) {
  // console.log("🚀 ~ file: getObjectValue.js ~ line 2 ~ getObjectValue ~ source, objects", source, objects)
  if(!source)
    return ""
  if(!objects)
    return ""
  if(!objects[0])
    return ""
	const object = objects[0]
  if(Array.isArray(source)) {
		return source.map(s => getObjectValue(s, object)).filter(x => !!x)
  }
	if(objects.length > 1)
		return getObjectValue(source[object], objects.slice(1))
	return source[object]?.toString()
}
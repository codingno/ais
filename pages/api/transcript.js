import nextConnect from "next-connect"; 

const db = require("../../models");

export default nextConnect()
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          // const data = await Model.findOne({
          //   where: { id: req.query.id },
          // });
					let data
          if (!data) return res.status(404).json({ error: "Data not found" });
          return res.status(200).json({ data });
        } catch (error) {
          return res.status(500).json({ error });
        }
      } else {
        try {
          // const data = await db.sequelize.query('select c.semester, c.semester as id, sum(c.credits * g.point) point_earned, sum(c.credits) total_credits, sum(c.credits * g.point) / sum(c.credits) ipk from academic_krs akrs left join master_grade g on g.id = akrs.grade_id left join academic_schedule asch on asch.id = akrs.schedule_id left join courses c on c.id = asch.course_id where akrs.student_number = :student_number and g.id is not null group by akrs.semester;', { type: db.Sequelize.QueryTypes.SELECT, replacements: { student_number: req.query.student_number } });
					let data = await db.sequelize.query('select akrs.semester, akrs.semester as id, sum(c.credits * g.point) point_earned, sum(c.credits) total_credits, sum(c.credits * g.point) / sum(c.credits) ipk from academic_krs akrs left join master_grade g on g.id = akrs.grade_id left join academic_schedule asch on asch.id = akrs.schedule_id left join courses c on c.id = asch.course_id where akrs.student_number = :student_number and g.id is not null group by akrs.semester;', { type: db.Sequelize.QueryTypes.SELECT, replacements: { student_number: req.query.student_number } });
          // if (data.length == 0)
          //   return res.status(404).json({ error: "Data not found", data });
          data.map(x => {
            Object.keys(x).map(y => {
              x[y] = parseFloat(x[y])
            })
          })
          return res.status(200).json({ data });
        } catch (error) {
          return res.status(500).json({ error });
        }
      }
    })
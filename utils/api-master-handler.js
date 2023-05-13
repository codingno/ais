import nextConnect from "next-connect";

export default function (Model) {
  return nextConnect()
    .post(async (req, res) => {
      const body = req.body;
      if (!body.name)
        return res.status(400).json({ message: "Incomplete parameters" });

      try {
        const data = Model.create(body);
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })
    .get(async (req, res) => {
      if (req.query.id) {
        try {
          const data = await Model.findOne({
            where: { id: req.query.id },
          });
          if (!data) return res.status(404).json({ error: "Data not found" });
          return res.status(200).json({ data });
        } catch (error) {
          return res.status(500).json({ error });
        }
      } else {
        try {
          const data = await Model.findAll();
          if (data.length == 0)
            return res.status(404).json({ error: "Data not found", data });
          return res.status(200).json({ data });
        } catch (error) {
          return res.status(500).json({ error });
        }
      }
    })
    .patch(async (req, res) => {
      const body = req.body;
      const id = body.id;
      if (!id) return res.status(400).json({ error: "Incomplete parameters" });
      delete body.id;
      try {
        await Model.update(body, {
          where: { id: id },
        });
        return res.status(200).json({ message: "success updated data" });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })
    .delete(async (req, res) => {
      const body = req.body;
      if (!body.id)
        return res.status(400).json({ message: "Incomplete parameters" });
      try {
        await Model.destroy({
          where: { id: body.id },
        });
        return res.status(200).json({ message: "success delete data" });
      } catch (error) {
        return res.status(500).json({ error });
      }
    });
}

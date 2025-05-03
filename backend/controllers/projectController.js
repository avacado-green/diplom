const Project = require('../models/project');

exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    // Метод populate заполнит поля manager и team данными пользователей
    const projects = await Project.find().populate('manager').populate('team');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

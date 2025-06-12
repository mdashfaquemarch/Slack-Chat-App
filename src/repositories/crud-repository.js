class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const newDoc = await this.model.create(data);
    return newDoc;
  }

  async getAll() {
    const allDocs = await this.model.find();
    return allDocs;
  }

  async getById(id) {
    const doc = await this.model.findById(id);
    return doc;
  }

  async delete(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }

  async update(id, data) {
    const updatedDoc = await this.model.findByIdAndUpdate(id, data);
    return updatedDoc;
  }

  async deleteMany(modelIds) {
    const response = await this.model.deleteMany({
      _id: {
        $in: modelIds
      }
    })
    return response;
  }
}

export default CrudRepository;

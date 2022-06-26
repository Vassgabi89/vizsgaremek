module.exports = (model, populateList = []) => {
    return {
        findAll: () => model.find({}).populate(...populateList),
        findOne: (id) => model.findById(id).populate(...populateList),
        insertOne: async (body) => {
            console.log(body);
            const newEntity = new model(body);
            return newEntity.save();
            const error = newEntity.validateSync();  //itt futtatom a validációt
            if (!error) {
            }
            throw new Error(error);
        },
        updateOne: async (id, body) => {
            const newEntity = new model(body);
            const error = newEntity.validateSync();  //itt futtatom a validációt
            if (!error) {
                return model.findByIdAndUpdate(id, body, {new: true});
                /*
                await newEntity.save()
                const updatedEntity = await model.findById(id)
                return updatedEntity
                */
                
            }
            throw new Error(error);
        },
        delete: async (id) => {
            //console.log(id);
            return model.findByIdAndRemove(id)
        }
    };
};

import fieldsReducer from './../client/src/reducers/fieldsReducer'

const fields = [{
    key: "email",
    name: "Email address",
    placeholder: "johndoe@gmail.com",
    type: "email",
    required: true,
    validate: () => "ok"
}];

describe('>>>Reducer --- Test fieldsReducer',()=>{
    it('+++ reducer for VALIDATE', () => {
        let state = {
            list: fields
        }
        state = fieldsReducer(state, { type: "VALIDATE", key: "email" })
        expect(state).toEqual({ list: [ { ...fields[0], error: "This field is required!" } ] })
    });
    it('+++ reducer for UPDATE_VALUE', () => {
        let state = {
            list: fields
        }
        state = fieldsReducer(state, {type:"UPDATE_VALUE", key: "email", value: "test_value"})
        expect(state).toEqual( { list: [ { ...fields[0], value: "test_value" } ] })
    });
});
import {validateFields, fieldUpdateValue} from './../client/src/actions/fields'

describe('>>>ACTION --- Test fieldsAction',()=>{
    it('+++ actionCreator validateFields', () => {
        const add = validateFields("firstName")
        expect(add).toEqual({
            type: "VALIDATE",
            key: "firstName"
        })
    });
it('+++ actionCreator fieldUpdateValue', () => {
        const subtract = fieldUpdateValue("firstName", "value")
        expect(subtract).toEqual({
            type: "UPDATE_VALUE",
            key: "firstName",
            value: "value"
        })
    });
});
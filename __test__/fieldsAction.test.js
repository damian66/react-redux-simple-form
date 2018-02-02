import {setOutput} from './../client/src/actions/output'

describe('>>>ACTION --- Test outputAction',()=>{
    it('+++ actionCreator setOutput', () => {
        const test = setOutput("Test", 1)
        expect(test).toEqual({
            type: "SET_MESSAGE",
            msg: "Test",
            state: 1
        })
    });
});
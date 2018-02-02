import outputReducer from './../client/src/reducers/outputReducer'

describe('>>>Reducer --- Test outputReducer',()=>{
    it('+++ reducer for SET_MESSAGE', () => {
        let state = {
            msg: "test",
            state: 1
        }
        state = outputReducer(state, { type: "SET_MESSAGE", msg: "changed", state: 1 })
        expect(state).toEqual({ msg: "changed", state: 1, time: expect.anything() })
    });
});
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {AuthActionType, deleteJwtToken, deleteUser, setJwtToken, setUser} from "../../actions/AuthActions";
import {User} from "../../models/User";

const mockStore = configureMockStore([thunk]);

describe("AuthActions", () => {
  describe("setJwtToken", () => {
    it('should return a correct SetJwtTokenAction', () => {
      const initialState = {};
      const store = mockStore(initialState);

      const expected = [{type: AuthActionType.SET_JWT_TOKEN, payload: "token123"}];

      store.dispatch(setJwtToken("token123"));

      expect(store.getActions()).toEqual(expected);
    });
  });

  describe("deleteJwtToken", () => {
    it('should return a correct DeleteJwtTokenAction', () => {
      const initialState = {};
      const store = mockStore(initialState);

      const expected = [{type: AuthActionType.DELETE_JWT_TOKEN}]

      store.dispatch(deleteJwtToken())

      expect(store.getActions()).toEqual(expected);
    });
  });

  describe("setUser", () => {
    it('should return a correct SetUserAction', () => {
      const initialState = {};
      const store = mockStore(initialState);

      const user = new User("id", "John");
      const expected = [{type: AuthActionType.SET_USER, payload: user}];

      store.dispatch(setUser(user));

      expect(store.getActions()).toEqual(expected);
    });
  });

  describe("deleteUser", () => {
    it('should return a correct DeleteUserAction', () => {
      const initialState = {};
      const store = mockStore(initialState);

      const expected = [{type: AuthActionType.DELETE_USER}]

      store.dispatch(deleteUser())

      expect(store.getActions()).toEqual(expected);
    });
  });
});
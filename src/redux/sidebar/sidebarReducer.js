import ContentHome from "../../components/Content/ContentHome";
const initialState = {
  collapsed: false,
  selectedItem: '1',
  title: 'Home',
  component: ContentHome,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, collapsed: !state.collapsed };

    case 'UPDATE_SELECTED_ITEM':
      return {
      ...state,
      selectedItem: action.payload.key,
      title: action.payload.title,
      component: action.payload.component
      };
    default:
      return state;
  }
};
  
  export default sidebarReducer;
  
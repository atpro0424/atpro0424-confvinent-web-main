export const toggleSidebar = () => ({
    type: 'TOGGLE_SIDEBAR',
  });

export const updateSelectedItem = (key, title, component) => ({
  type: 'UPDATE_SELECTED_ITEM',
  payload: { key, title, component},
});
  
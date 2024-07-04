export const getProps = () => {
  return {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: String,
      default: "106px",
    },
  };
};

export const getState = () => {
  return {
    formValidate: {} as any,
  };
};

import { type Ref, computed } from 'vue';

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 1000),
  current: 0,
};

export const useId = (namespace = 'aka'): Ref<string> => {
  return computed(
    () =>
      `${namespace}-${defaultIdInjection.prefix}-${defaultIdInjection.current++}`
  );
};

export default useId;

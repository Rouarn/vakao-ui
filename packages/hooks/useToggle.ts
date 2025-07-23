import { ref, Ref } from 'vue';

/**
 * 切换布尔值的钩子函数
 * @param initialValue 初始值，默认为false
 * @returns 包含当前状态、切换函数、设置为true和设置为false的函数的对象
 */
export function useToggle(initialValue: boolean = false) {
  const state = ref(initialValue);

  function toggle() {
    state.value = !state.value;
  }

  function setTrue() {
    state.value = true;
  }

  function setFalse() {
    state.value = false;
  }

  return {
    state,
    toggle,
    setTrue,
    setFalse
  };
}

export type UseToggleReturn = {
  state: Ref<boolean>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};
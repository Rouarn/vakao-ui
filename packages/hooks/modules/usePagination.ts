import { ref, computed, watch, type Ref, type ComputedRef } from "vue";

/**
 * 分页配置选项
 */
export interface UsePaginationOptions {
  /** 初始页码（从 1 开始） */
  initialPage?: number;
  /** 初始每页大小 */
  initialPageSize?: number;
  /** 总数据量 */
  total?: number | Ref<number>;
  /** 可选的每页大小选项 */
  pageSizeOptions?: number[];
  /** 页码变化回调 */
  onPageChange?: (page: number) => void;
  /** 每页大小变化回调 */
  onPageSizeChange?: (pageSize: number) => void;
  /** 分页信息变化回调 */
  onChange?: (page: number, pageSize: number) => void;
}

/**
 * 分页信息接口
 */
export interface PaginationInfo {
  /** 当前页码 */
  current: number;
  /** 每页大小 */
  pageSize: number;
  /** 总数据量 */
  total: number;
  /** 总页数 */
  totalPages: number;
  /** 是否有上一页 */
  hasPrev: boolean;
  /** 是否有下一页 */
  hasNext: boolean;
  /** 当前页开始索引（从 0 开始） */
  startIndex: number;
  /** 当前页结束索引（从 0 开始） */
  endIndex: number;
}

/**
 * 跳转到指定页函数类型
 */
export type GoToPageFunction = (page: number) => void;

/**
 * 上一页函数类型
 */
export type PrevPageFunction = () => void;

/**
 * 下一页函数类型
 */
export type NextPageFunction = () => void;

/**
 * 跳转到第一页函数类型
 */
export type FirstPageFunction = () => void;

/**
 * 跳转到最后一页函数类型
 */
export type LastPageFunction = () => void;

/**
 * 设置每页大小函数类型
 */
export type SetPageSizeFunction = (pageSize: number) => void;

/**
 * 设置总数据量函数类型
 */
export type SetTotalFunction = (total: number) => void;

/**
 * 重置分页函数类型
 */
export type ResetPaginationFunction = () => void;

/**
 * 分页操作接口
 */
export interface PaginationActions {
  /** 跳转到指定页 */
  goToPage: GoToPageFunction;
  /** 上一页 */
  prev: PrevPageFunction;
  /** 下一页 */
  next: NextPageFunction;
  /** 第一页 */
  first: FirstPageFunction;
  /** 最后一页 */
  last: LastPageFunction;
  /** 设置每页大小 */
  setPageSize: SetPageSizeFunction;
  /** 设置总数据量 */
  setTotal: SetTotalFunction;
  /** 重置分页 */
  reset: ResetPaginationFunction;
}

/**
 * usePagination 返回值类型
 */
export type UsePaginationReturn = [ComputedRef<PaginationInfo>, PaginationActions];

/**
 * 分页管理 Hook
 *
 * 提供完整的分页状态管理和操作功能，支持页码跳转、每页大小调整等。
 * 自动计算分页信息，提供丰富的分页操作方法。
 *
 * @param options - 配置选项
 * @returns [paginationInfo, actions] - 分页信息、操作方法
 *
 * @example
 * ```typescript
 * // 基础用法
 * const [pagination, actions] = usePagination({
 *   initialPage: 1,
 *   initialPageSize: 10,
 *   total: 100
 * });
 *
 * // 获取分页信息
 * console.log('当前页:', pagination.value.current);
 * console.log('总页数:', pagination.value.totalPages);
 * console.log('是否有下一页:', pagination.value.hasNext);
 *
 * // 分页操作
 * actions.next(); // 下一页
 * actions.prev(); // 上一页
 * actions.goToPage(5); // 跳转到第5页
 * actions.setPageSize(20); // 设置每页20条
 *
 * // 响应式总数据量
 * const total = ref(0);
 * const [paginationWithReactiveTotal] = usePagination({
 *   total,
 *   initialPageSize: 15
 * });
 *
 * // 带回调的用法
 * const [paginationWithCallbacks, paginationActions] = usePagination({
 *   initialPage: 1,
 *   initialPageSize: 10,
 *   total: 200,
 *   onPageChange: (page) => {
 *     console.log('页码变化:', page);
 *     // 重新加载数据
 *     loadData(page, pagination.value.pageSize);
 *   },
 *   onPageSizeChange: (pageSize) => {
 *     console.log('每页大小变化:', pageSize);
 *     // 重新加载数据
 *     loadData(1, pageSize);
 *   },
 *   onChange: (page, pageSize) => {
 *     console.log('分页信息变化:', { page, pageSize });
 *   }
 * });
 *
 * // 在表格组件中使用
 * const handleTableChange = (page: number, pageSize: number) => {
 *   actions.goToPage(page);
 *   actions.setPageSize(pageSize);
 * };
 *
 * // 数据切片（用于前端分页）
 * const paginatedData = computed(() => {
 *   const { startIndex, endIndex } = pagination.value;
 *   return allData.value.slice(startIndex, endIndex + 1);
 * });
 * ```
 *
 * @since 0.0.2
 * @author Vakao UI Team
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const { initialPage = 1, initialPageSize = 10, total: totalOption = 0, onPageChange, onPageSizeChange, onChange } = options;

  // 状态管理
  const currentPage = ref(initialPage);
  const pageSize = ref(initialPageSize);
  const total = ref(typeof totalOption === "number" ? totalOption : totalOption.value);

  // 监听响应式 total
  if (typeof totalOption !== "number") {
    watch(
      totalOption,
      (newTotal) => {
        total.value = newTotal;
        // 如果当前页超出范围，调整到最后一页
        const maxPage = Math.max(1, Math.ceil(newTotal / pageSize.value));
        if (currentPage.value > maxPage) {
          currentPage.value = maxPage;
        }
      },
      { immediate: true },
    );
  }

  // 计算分页信息
  const paginationInfo = computed<PaginationInfo>(() => {
    const totalPages = Math.max(1, Math.ceil(total.value / pageSize.value));
    const current = Math.min(currentPage.value, totalPages);
    const startIndex = (current - 1) * pageSize.value;
    const endIndex = Math.min(startIndex + pageSize.value - 1, total.value - 1);

    return {
      current,
      pageSize: pageSize.value,
      total: total.value,
      totalPages,
      hasPrev: current > 1,
      hasNext: current < totalPages,
      startIndex,
      endIndex,
    };
  });

  // 分页操作方法
  const actions: PaginationActions = {
    /**
     * 跳转到指定页
     */
    goToPage: (page: number) => {
      const targetPage = Math.max(1, Math.min(page, paginationInfo.value.totalPages));
      if (targetPage !== currentPage.value) {
        currentPage.value = targetPage;
        onPageChange?.(targetPage);
        onChange?.(targetPage, pageSize.value);
      }
    },

    /**
     * 上一页
     */
    prev: () => {
      if (paginationInfo.value.hasPrev) {
        actions.goToPage(currentPage.value - 1);
      }
    },

    /**
     * 下一页
     */
    next: () => {
      if (paginationInfo.value.hasNext) {
        actions.goToPage(currentPage.value + 1);
      }
    },

    /**
     * 第一页
     */
    first: () => {
      actions.goToPage(1);
    },

    /**
     * 最后一页
     */
    last: () => {
      actions.goToPage(paginationInfo.value.totalPages);
    },

    /**
     * 设置每页大小
     */
    setPageSize: (newPageSize: number) => {
      if (newPageSize !== pageSize.value && newPageSize > 0) {
        const oldPageSize = pageSize.value;
        pageSize.value = newPageSize;

        // 计算新的页码，尽量保持当前数据位置
        const currentStartIndex = (currentPage.value - 1) * oldPageSize;
        const newPage = Math.max(1, Math.ceil((currentStartIndex + 1) / newPageSize));

        currentPage.value = newPage;
        onPageSizeChange?.(newPageSize);
        onChange?.(newPage, newPageSize);
      }
    },

    /**
     * 设置总数据量
     */
    setTotal: (newTotal: number) => {
      if (newTotal !== total.value && newTotal >= 0) {
        total.value = newTotal;

        // 如果当前页超出范围，调整到最后一页
        const maxPage = Math.max(1, Math.ceil(newTotal / pageSize.value));
        if (currentPage.value > maxPage) {
          actions.goToPage(maxPage);
        }
      }
    },

    /**
     * 重置分页
     */
    reset: () => {
      currentPage.value = initialPage;
      pageSize.value = initialPageSize;
      total.value = typeof totalOption === "number" ? totalOption : totalOption.value;
      onChange?.(initialPage, initialPageSize);
    },
  };

  return [paginationInfo, actions];
}

/**
 * 默认导出
 */
export default usePagination;

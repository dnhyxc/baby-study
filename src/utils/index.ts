// 滚动到某位置
export const scrollTo = (ref: any, position: number, time = 20, type = 'top') => {
  // el-scrollbar 容器
  const el = ref.value as HTMLDivElement;
  // 使用requestAnimationFrame，如果没有则使用setTimeOut
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      return setTimeout(callback, time);
    };
  }
  // 获取当前元素滚动的距离
  let scrollTopDistance = type === 'top' ? el.scrollTop : el.scrollLeft;
  const smoothScroll = () => {
    // 如果你要滚到顶部，那么position传过来的就是0，下面这个distance肯定就是负值。
    const distance = position - scrollTopDistance;
    // 每次滚动的距离要不一样，制造一个缓冲效果
    scrollTopDistance = scrollTopDistance + distance / 5;
    // 判断条件
    if (Math.abs(distance) < 1) {
      type === 'top' ? (el.scrollTop = position) : (el.scrollLeft = position);
    } else {
      type === 'top' ? (el.scrollTop = scrollTopDistance) : (el.scrollLeft = scrollTopDistance);
      requestAnimationFrame(smoothScroll);
    }
  };
  requestAnimationFrame(smoothScroll);
};

import { ref, onMounted, onUnmounted } from 'vue'

/**
 *
 * @param {Object} hashMap 需要筛选的 hash 映射对象
 * @param {Object} noMatchValue 未匹配到 hash 值时的默认值
 * @returns
 */
export function useFilterByHash(hashMap, noMatchValue) {
  // 初次加载时，获取当前 hash 值
  const hash = getHash()
  // 匹配到的 hash 对应的值
  const matchValue = hashMap[hash]
  // 筛选结果
  const filtered = ref({
    hash: matchValue ? hash : '',
    value: matchValue || noMatchValue
  })

  // 获取当前 hash 值
  function getHash() {
    return location.hash.replace(/#\/?/, '')
  }

  // 监听 hash 值变化
  function handleHashChange() {
    const hash = getHash()
    const matchValue = hashMap[hash]
    // filtered.value = {
    //   hash,
    //   value: matchValue || noMatchValue
    // }
    filtered.value.hash = matchValue ? hash : ''
    filtered.value.value = matchValue || noMatchValue
  }

  // 组件挂载时，监听 hash 值变化
  onMounted(() => {
    window.addEventListener('hashchange', handleHashChange)
  })
  // 组件卸载时，取消监听 hash 值变化
  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHashChange)
  })

  return {
    filtered
  }
}

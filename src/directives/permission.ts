import type { Directive } from 'vue'
import { usePermissionStore } from '@/stores/permission'

export const permissionDirective: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    const perm = usePermissionStore()
    const code = binding.value
    if (!code) return
    if (!perm.perms.includes(code)) {
      el.parentNode?.removeChild(el)
    }
  },
}

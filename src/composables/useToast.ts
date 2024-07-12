import { toastSymbol } from '@/plugins/toast'
import { inject } from 'vue'

export const useToast = () => {
  return inject(toastSymbol)!
}

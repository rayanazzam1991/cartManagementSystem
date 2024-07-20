import {beforeEach,vi} from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import * as Toast from '@/composables/useToast'

beforeEach(()=>{
  setActivePinia(createPinia())
})

vi.spyOn(Toast,"useToast").mockReturnValue({
  dismiss: vi.fn(),
  dismissAll: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
  info:vi.fn(),
  warning: vi.fn(),
  primary: vi.fn(),
})
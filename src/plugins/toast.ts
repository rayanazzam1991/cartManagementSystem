import type { INotyfNotificationOptions, Notyf, NotyfNotification } from 'notyf'
import type { InjectionKey } from 'vue'
import { definePlugin } from '@/main'


export const toastSymbol: InjectionKey<Awaited<ReturnType<typeof initToastService>>> =
  Symbol('toast')

async function initToastService() {
  let toast: Notyf

  if (!import.meta.env.SSR) {
    const { Notyf } = await import('notyf')
    toast = new Notyf({
      duration: 5000,
      position: {
        x: 'right',
        y: 'bottom',
      },
      types: [
        {
          type: 'warning',
          background: '#FFC107',
        },
        {
          type: 'info',
          background: '#f2f2f2',
        },
        {
          type: 'primary',
          background: '#f2f2f2',
        },
      ],
    })
  }

  return {
    dismiss: (notification: NotyfNotification) => {
      toast?.dismiss(notification)
    },
    dismissAll: () => {
      toast?.dismissAll()
    },
    success: (payload: string | Partial<INotyfNotificationOptions>) => {
      return toast?.success(payload)
    },
    error: (payload: string | Partial<INotyfNotificationOptions>) => {
      return toast?.error(payload)
    },
    info: (payload: string | Partial<INotyfNotificationOptions>) => {
      const options: Partial<INotyfNotificationOptions> = {
        type: 'info',
      }

      if (typeof payload === 'string') {
        options.message = payload
      } else {
        Object.assign(options, payload)
      }

      return toast?.open(options)
    },
    warning: (payload: string | Partial<INotyfNotificationOptions>) => {
      const options: Partial<INotyfNotificationOptions> = {
        type: 'warning',
      }

      if (typeof payload === 'string') {
        options.message = payload
      } else {
        Object.assign(options, payload)
      }

      return toast?.open(options)
    },
    primary: (payload: string | Partial<INotyfNotificationOptions>) => {
      const options: Partial<INotyfNotificationOptions> = {
        type: 'primary',
      }

      if (typeof payload === 'string') {
        options.message = payload
      } else {
        Object.assign(options, payload)
      }

      return toast?.open(options)
    },
  }
}

export default definePlugin(async ({ app }) => {
  const toast = await initToastService()
  app.provide(toastSymbol, toast)
})

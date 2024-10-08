<script lang="ts">
import type { Slot } from 'vue'
import { flatUnwrap } from '../utils/node'
import { defineComponent, getCurrentInstance, useSlots, computed, h } from '#imports'

/**
 * MDCSlot component
 */
export default defineComponent({
  name: 'MDCSlot',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    },
    /**
     * VNode to render
     * This is only useful for render functions
     */
    use: {
      type: Function,
      default: undefined
    }
  },
  setup(props) {
    const { parent } = getCurrentInstance()!
    const { default: fallbackSlot } = useSlots()

    const tags = computed(() => {
      if (typeof props.unwrap === 'string') {
        return props.unwrap.split(' ')
      }
      return ['*']
    })

    return {
      fallbackSlot,
      tags,
      parent
    }
  },
  render({ use, unwrap, fallbackSlot, tags, parent }: any) {
    try {
      let slot: Slot = use
      if (typeof use === 'string') {
        slot = parent?.slots[use] || parent?.parent?.slots[use]

        console.warn(`Please set :use="$slots.${use}" in <MDCSlot> component to enable reactivity`)
      }

      if (!slot) {
        return fallbackSlot ? fallbackSlot() : h('div')
      }

      return unwrap ? flatUnwrap(slot(), tags) : [slot()]
    } catch {
      // Catching errors to allow content reactivity
      return h('div')
    }
  }
})
</script>

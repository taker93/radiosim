import type {DirectiveBinding, ObjectDirective} from "@vue/runtime-core";

type BindingValue = number;

interface ExtendedDirective extends ObjectDirective<HTMLElement, BindingValue> {
    onDown: (e: PointerEvent) => void;
    onMove: (e: PointerEvent) => void;
    onRelease: (e: PointerEvent) => void;
    timeout: ReturnType<typeof setTimeout> | null; // default timeout is 1000 (1s)
}

const onDown = (el: HTMLElement, binding: DirectiveBinding<BindingValue>, e: PointerEvent) => {
    e.preventDefault();
    const delay = binding.value ?? 1000;
    const dir = getDir(binding);
    dir.timeout = setTimeout(() => el.dispatchEvent(new CustomEvent('longpress')), delay);
};

const onMove = (binding: DirectiveBinding<BindingValue>, e: PointerEvent) => {
    e.preventDefault();
};

const onRelease = (binding: DirectiveBinding<BindingValue>, e: PointerEvent) => {
    e.preventDefault();
    const dir = getDir(binding);
    if (dir.timeout !== null) {
        clearTimeout(dir.timeout);
    }
};

const getDir = (binding: DirectiveBinding<number>) => {
    return binding.dir as ExtendedDirective;
};

export const vLongpress: ExtendedDirective = {
    onDown: () => ({}),
    onMove: () => ({}),
    onRelease: () => ({}),
    timeout: null,
    mounted(el, binding) {
        const dir = getDir(binding);
        dir.onDown = (e: PointerEvent) => onDown(el, binding, e);
        dir.onMove = (e: PointerEvent) => onMove(binding, e);
        dir.onRelease = (e: PointerEvent) => onRelease(binding, e);
        el.addEventListener('pointerdown', dir.onDown);
        el.addEventListener('pointermove', dir.onMove);
        el.addEventListener('pointerup', dir.onRelease);
        el.addEventListener('pointerleave', dir.onRelease);
    },
    beforeUnmount(el, binding) {
        const dir = getDir(binding);
        el.removeEventListener('pointerdown', dir.onDown);
        el.removeEventListener('pointermove', dir.onMove);
        el.removeEventListener('pointerup', dir.onRelease);
        el.removeEventListener('pointerleave', dir.onRelease);
    },
};
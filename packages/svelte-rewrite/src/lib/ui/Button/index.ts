import { cva } from "class-variance-authority";

export { default as Button } from "./Button.svelte";

export const buttonVariants = cva('btn', {
    variants: {
        variant: {
            default: '',
            primary: 'btn-primary',
            secondary: 'btn-secondary',
            accent: 'btn-accent',
            ghost: 'btn-ghost',
            link: 'btn-link',
            info: 'btn-info',
            success: 'btn-success',
            warning: 'btn-warning',
            error: 'btn-error',
            primaryOutline: 'btn-outline btn-primary',
            secondaryOutline: 'btn-outline btn-secondary',
            accentOutline: 'btn-outline btn-accent',
            infoOutline: 'btn-outline btn-info',
            successOutline: 'btn-outline btn-success',
            warningOutline: 'btn-outline btn-warning',
            errorOutline: 'btn-outline btn-error',
            glass: 'btn-glass'
        },
        size: {
            default: 'btn',
            xs: 'btn-xs',
            sm: 'btn-sm',
            lg: 'btn-lg',
            responsive: 'btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
        },
        shape: {
            default: '',
            circle: 'btn-circle',
            square: 'btn-square'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        shape: 'default'
    }
});
/// <reference types="miniprogram-api-typings" />

export type ModalGravity = 'center' | 'left' | 'top' | 'right' | 'bottom';

export interface ModalProperties {
    /** 控制模态框的显示与隐藏 */
    visible: boolean;
    /** 是否显示蒙层，默认 true */
    mask: boolean;
    /** 模态框显示位置，默认 center */
    gravity: ModalGravity;
    /** 控制 z-index，默认 10 */
    zIndex: number;
    /** 动画时长，如 "0.2s" */
    animDuration: string;
}

/** bindtapMask 事件 detail */
export interface ModalTapMaskEventDetail {}

/** bindtapMask 事件对象 */
export interface ModalTapMaskEvent extends WechatMiniprogram.CustomEvent {
    detail: ModalTapMaskEventDetail;
}

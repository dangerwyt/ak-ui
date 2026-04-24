export type AlertType = 'success' | 'warning' | 'danger' | 'info';
export type AlertEffect = 'light' | 'dark';

export interface AlertProps {
  type?: AlertType;
  effect?: AlertEffect;
  title?: string;
  description?: string;
  closeable?: boolean;
  showIcon?: boolean;
  center?: boolean;
}

export interface AlertEmits {
  (e: 'close', val: MouseEvent): void;
}

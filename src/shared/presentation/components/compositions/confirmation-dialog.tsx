'use client';

import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';

interface ConfirmationDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when the dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Dialog title */
  title: string;
  /** Dialog description/message */
  description: string;
  /** Callback when the confirm button is clicked */
  onConfirm: () => void;
  /** Callback when the cancel button is clicked */
  onCancel: () => void;
  /** Text for the confirm button (default: "Continue") */
  confirmText?: string;
  /** Text for the cancel button (default: "Cancel") */
  cancelText?: string;
  /** Variant for the confirm button (default: "default") */
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Whether the confirm action is loading */
  isLoading?: boolean;
}

/**
 * ConfirmationDialog - Reusable confirmation dialog for user actions
 *
 * Features:
 * - Consistent confirmation UI across the app
 * - Customizable button text and variants
 * - Loading state support
 * - Keyboard accessible (Esc to cancel)
 *
 * @example
 * ```tsx
 * <ConfirmationDialog
 *   open={showConfirm}
 *   onOpenChange={setShowConfirm}
 *   title="Delete Item"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowConfirm(false)}
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   confirmVariant="destructive"
 * />
 * ```
 */
export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  confirmVariant = 'default',
  isLoading = false,
}: ConfirmationDialogProps) {
  const t = useTranslations('shared.confirmationDialog');

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (!isLoading) {
      onCancel();
    }
  };

  // Use provided text or fallback to i18n defaults
  const finalConfirmText = confirmText ?? t('continue');
  const finalCancelText = cancelText ?? t('cancel');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={handleCancel} variant="outline" disabled={isLoading}>
            {finalCancelText}
          </Button>
          <Button type="button" onClick={handleConfirm} variant={confirmVariant} disabled={isLoading}>
            {isLoading ? t('loading') : finalConfirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

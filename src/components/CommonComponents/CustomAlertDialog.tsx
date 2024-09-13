import { PropsWithChildren } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
// Update the interface to extend PropsWithChildren
interface CustomAlertDialogProps extends PropsWithChildren {
  title?: string;
  desc?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  confirmClickHandler: (arg?: number | string) => void;
}

// Make sure to use the updated interface name here
export function CustomAlertDialog({
  title = 'Are you sure?',
  desc = '',
  cancelBtnText = 'Cancel',
  confirmBtnText = 'Confirm',
  confirmClickHandler,
  children
}: CustomAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelBtnText}</AlertDialogCancel>
          <AlertDialogAction onClick={() => confirmClickHandler()}>
            {confirmBtnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

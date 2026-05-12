import { useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import config from "../resources/config/config";
import { useAuthSession } from "../auth/AuthSessionProvider";
import { useModalKeyboardNavigation } from "../hooks/useModalKeyboardNavigation";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountDeleted: () => void;
}

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onAccountDeleted,
}: DeleteAccountModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { session, revalidateSession, handleAccountDeleted } = useAuthSession();
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmInputRef = useRef<HTMLInputElement>(null);

  const isDeleteEnabled = confirmText.toUpperCase() === "DELETE";

  const handleDeleteAccount = async () => {
    if (!isDeleteEnabled || !config.supabaseClient) return;

    setIsDeleting(true);

    try {
      console.log("[DeleteAccount] Starting account deletion process...");

      const { data: refreshData, error: refreshError } =
        await config.supabaseClient.auth.refreshSession();

      let accessToken: string | null = session?.access_token || null;

      if (refreshError) {
        console.error("[DeleteAccount] Session refresh failed:", refreshError);
        if (!accessToken) {
          const snapshot = await revalidateSession();
          if (snapshot.status === "authenticated") {
            accessToken = snapshot.session?.access_token || null;
          }
        }

        if (!accessToken) {
          throw new Error(
            t("deleteAccount.sessionExpired", "Session expired. Please log out and log in again to delete your account.")
          );
        }
      } else if (refreshData.session?.access_token) {
        accessToken = refreshData.session.access_token;
      } else {
        throw new Error(
          t("deleteAccount.sessionInvalid", "Unable to verify your session. Please log out and log in again.")
        );
      }

      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data?.success !== true) {
        throw new Error(data?.error || t("deleteAccount.defaultError", "Failed to delete account"));
      }

      await handleAccountDeleted();

      toast({
        title: t("deleteAccount.successTitle", "Account Deleted"),
        description: t("deleteAccount.successMessage", "Your account has been successfully deleted."),
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        onAccountDeleted();
      }, 500);
    } catch (error: any) {
      console.error("[DeleteAccount] Error:", error);
      toast({
        title: t("deleteAccount.errorTitle", "Error"),
        description: error.message || t("deleteAccount.errorMessage", "Something went wrong."),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    // BUG FIX: Prevent closing the modal while the API call is running
    if (isDeleting) return;
    setConfirmText("");
    onClose();
  };

  useModalKeyboardNavigation({
    isOpen,
    containerRef: modalRef,
    initialFocusRef: confirmInputRef,
    onClose: handleClose, // Now protected by the isDeleting check
  });

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-white/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
        <div
          ref={modalRef}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center text-center border border-gray-100/50"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
          tabIndex={-1}
        >
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-black text-[2rem]"
                style={{ fontVariationSettings: "'wght' 200" }}
              >
                delete_forever
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8 px-2">
            <h2
              id="delete-account-title"
              className="text-[1.75rem] leading-[1.2] text-black lowercase tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("deleteAccount.title", "are you sure?")}
            </h2>
            <p className="text-gray-500 text-[0.85rem] leading-relaxed font-normal lowercase max-w-[90%] mx-auto">
              {t(
                "deleteAccount.warning",
                "this permanently deletes your profile, onboarding, plaid, chats, nda, kyc, and stored files. only a minimal de-identified payment audit may remain for compliance."
              )}
            </p>
          </div>

          <div className="w-full mb-8">
            <p className="text-xs text-gray-500 lowercase font-semibold mb-3 tracking-wide">
              {t("deleteAccount.typePrompt", "type DELETE to confirm")}
            </p>
            <input
              ref={confirmInputRef}
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder={t("deleteAccount.placeholder", "DELETE")}
              className="w-full h-[52px] border border-gray-200 bg-white px-4 text-sm text-black font-mono tracking-[2px] placeholder:text-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label={t("deleteAccount.inputAria", "Type DELETE to confirm account deletion")}
            />
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={handleDeleteAccount}
              disabled={!isDeleteEnabled || isDeleting}
              className="w-full h-12 bg-black text-white font-medium text-[0.8rem] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.99] border border-black hover:bg-black/90 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none lowercase"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                  <span>{t("deleteAccount.deleting", "deleting...")}</span>
                </>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'wght' 400" }}
                  >
                    delete_forever
                  </span>
                  <span>{t("deleteAccount.buttonConfirm", "delete my account")}</span>
                </>
              )}
            </button>

            <button
              onClick={handleClose}
              disabled={isDeleting}
              className="w-full h-12 border border-black bg-white text-black font-medium text-[0.8rem] hover:bg-gray-50 transition-colors active:scale-[0.99] disabled:opacity-50 lowercase"
            >
              {t("deleteAccount.buttonCancel", "keep my account")}
            </button>
            {/* The redundant text cancel button was removed to improve UI clarity */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;
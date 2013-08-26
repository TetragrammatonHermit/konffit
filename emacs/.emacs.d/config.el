
; ***Base config

; Set lisp-package sources (for some lisp addons)
(require 'package)
(package-initialize)
(setq package-archives '(
    ("gnu" . "http://elpa.gnu.org/packages/")
    ("marmalade" . "http://marmalade-repo.org/packages/")
    ("melpa" . "http://melpa.milkbox.net/packages/")))

; Set site-elisp to path (manually installed stuffs)
(add-to-list 'load-path "~/site-elisp/")

; Sync path with OS
(defun set-exec-path-from-shell-PATH ()
    (let ((path-from-shell (shell-command-to-string "$SHELL -c 'echo $PATH'")))
      (setenv "PATH" path-from-shell)
      (setq exec-path (split-string path-from-shell path-separator))))
(when window-system (set-exec-path-from-shell-PATH))

; *** Editor behaviour
(scroll-bar-mode -1) ; Hide scroll- and toolbar
(tool-bar-mode -1)
(setq inhibit-splash-screen t) ; Hide splash-screen and startup-message
(setq inhibit-startup-message t)

; Mac keybindings for international kb
(setq mac-option-modifier 'none)
(setq mac-command-modifier 'meta)

; Default window width and height
(defun custom-set-frame-size ()
  (add-to-list 'default-frame-alist '(height . 65))
  (add-to-list 'default-frame-alist '(width . 99)))
(custom-set-frame-size)
(add-hook 'before-make-frame-hook 'custom-set-frame-size)

; Auto follow symlinks
'(vc-follow-symlinks t)

(load-theme 'adwaita t)

; Transparency
(defun transparent(alpha-level no-focus-alpha-level)
 "Let's you make the window transparent"
 (interactive "nAlpha level (0-100): \nnNo focus alpha level (0-100): ")
 (set-frame-parameter (selected-frame) 'alpha (list alpha-level no-focus-alpha-level))
 (add-to-list 'default-frame-alist `(alpha ,alpha-level)))

; Auto save directory (don't create autosave crap on project folders)
(defvar user-temporary-file-directory
(concat temporary-file-directory user-login-name "/"))
(make-directory user-temporary-file-directory t)
(setq backup-by-copying t)
(setq backup-directory-alist
      `(("." . ,user-temporary-file-directory)
        (,tramp-file-name-regexp nil)))
(setq auto-save-list-file-prefix
      (concat user-temporary-file-directory ".auto-saves-"))
(setq auto-save-file-name-transforms
      `((".*" ,user-temporary-file-directory t)))

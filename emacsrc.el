;;; custom --- config
;;; Commentary:
;; all customizations happen here
;;; Code:

;;;; General

; Start daemon
(load "server")
(unless (server-running-p) (server-start))

(x-focus-frame nil)
; Disable scroll bars
(scroll-bar-mode -1)
; Make OSX special characters work
(setq mac-option-modifier 'nil
      mac-command-modifier 'meta
      x-select-enable-clipboard t)

; Nicer mousewheel scrolling
(setq mouse-wheel-scroll-amount '(1 ((shift) . 1) ((control) . nil)))
(setq mouse-wheel-progressive-speed nil)

; Magit use current window (use emacsclient of current installation)
(set-variable 'magit-emacsclient-executable "/usr/local/Cellar/emacs/HEAD/bin/emacsclient")

;; Set transparency of emacs
(defun transparency (value)
  "Set the transparency of the frame window.  VALUE = 0-100."
  
  (interactive "nTransparency Value 0 - 100 opaque:")
  (set-frame-parameter (selected-frame) 'alpha value))
(transparency 96)

;(smartparens-global-mode +1) ; This should be enabled by prelude, but isn't..
(setq prelude-flyspell nil) ; Disable spell checking
(setq prelude-guru nil)
                                        ; Disable whitespace-mode
(setq prelude-whitespace nil)

;;; Keybindings
(key-chord-mode 1)

; Prelude stole some default keybindings
(key-chord-define-global "uu" nil)
(key-chord-define-global "jv" 'undo-tree-visualize)
(global-set-key (kbd "\C-c c") 'comment-or-uncomment-region)

(global-set-key (kbd "M-§") 'other-frame)

; Ace-jump
(key-chord-define-global "hh" 'ace-jump-mode-pop-mark)
(key-chord-define-global "jk" 'ace-jump-word-mode)

(key-chord-define-global "jj" 'ace-jump-char-mode)

(key-chord-define-global "lö" 'iy-go-to-char)
(key-chord-define-global "lk" 'iy-go-to-char-backward)
(global-set-key (kbd "\C-å") 'iy-go-to-char-continue)

(global-set-key (kbd "\C-,") 'iedit-mode)
(global-set-key (kbd "\C-;") 'iedit-rectangle-mode)

;;;; Package setup
(require 'package)
(add-to-list 'package-archives
             '("marmalade" .
               "http://marmalade-repo.org/packages/"))
(package-initialize)

; currently disabled: scad-mode
(prelude-require-packages '(elpy
                            ecb
                            applescript-mode
                            auto-complete
                            ac-emmet
                            ac-js2
                            angular-snippets
                            iedit
                            js2-mode
                            emmet-mode
                            iy-go-to-char
                            
                            ))



; Autocomplete
;(global-auto-complete-mode t)
(setq ac-auto-start 2)
(setq ac-ignore-case nil)


(defun dired-open-mac ()
  "Open file from dired buffer with OSX default program."
  (interactive)
  (let ((file-name (dired-get-file-for-visit)))
    (if (file-exists-p file-name)
        (call-process "/usr/bin/open" nil 0 nil file-name))))

(add-hook 'dired-mode-hook
          '(lambda ()
             (define-key dired-mode-map "o" 'dired-open-mac)))

; Multiple cursors
;; (global-set-key (kbd "\C-<") 'mc/mark-next-like-this)
;; (global-set-key (kbd "\C->") 'mc/mark-previous-like-this)
;; (global-set-key (kbd "\C-M-g") 'mc/mark-all-dwim)
;; (key-chord-define-global "jc" 'mc/mark-more-like-this-extended)
;; (global-unset-key (kbd "M-<down-mouse-1>"))
;; (global-set-key (kbd "M-<mouse-1>") 'mc/add-cursor-on-click)


;;; Org-mode
(add-hook 'org-mode-hook
          (lambda ()
            (org-indent-mode t)
            (local-set-key "\C-M-<down>" 'org-move-subtree-down)
            (local-set-key "\C-M-<up>" 'org-move-subtree-up)
            )
          t)

;;; Python
; Elpy
(elpy-enable)


;; HTML
; Emmet
(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'css-mode-hook  'emmet-mode)
; Indent 2 spaces.
(add-hook 'emmet-mode-hook (lambda () (setq emmet-indentation 2)))
(setq emmet-move-cursor-between-quotes t)

;; Javascript
(setq js-indent-level 4)
(setq-default js2-basic-offset 4)

;;; Other
; Latex
(add-hook 'LaTeX-mode-hook 'turn-on-reftex)
(setq reftex-plug-into-AUCTeX t)
(setq-default ispell-program-name "aspell")

;;;;; Custom functions
(defun vi-open-line-above ()
  "Insert a newline above the current line and put point at beginning."
  (interactive)
  (unless (bolp)
    (beginning-of-line))
  (newline)
  (forward-line -1)
  (indent-according-to-mode))

(global-set-key (kbd "\C-O") 'vi-open-line-above)


(provide 'emacsrc)

;;; emacsrc.el ends here

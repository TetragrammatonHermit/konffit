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

(disable-theme 'zenburn)
(load-theme 'solarized-light t)

; Nicer mousewheel scrolling
(setq mouse-wheel-scroll-amount '(1 ((shift) . 1) ((control) . nil)))
(setq mouse-wheel-progressive-speed nil)

; Magit use current window (use emacsclient of current installation)
(set-variable 'magit-emacsclient-executable "/usr/local/Cellar/emacs/24.3/bin/emacsclient")

;; Set transparency of emacs
(defun transparency (value)
  "Set the transparency of the frame window.  VALUE = 0-100."
  (interactive "nTransparency Value 0 - 100 opaque:")
  (set-frame-parameter (selected-frame) 'alpha value))
(transparency 94)

(smartparens-global-mode +1)
(setq prelude-flyspell nil)             ; Disable spell checking
(setq prelude-guru nil)
                                        ; Disable whitespace-mode
(setq prelude-whitespace nil)

;; Minibuffer autocompletition with ido-mode and sme
;; http://www.masteringemacs.org/articles/2010/10/10/introduction-to-ido-mode/
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)
(setq ido-use-filename-at-point 'guess)
(ido-mode t)
(global-set-key (kbd "M-x") nil)
(global-set-key (kbd "M-x") 'smex)

;;; Keybindings
;;(key-chord-mode 1)

; Prelude stole some default keybindings
(key-chord-define-global "uu" nil)
(key-chord-define-global "zz" 'undo-tree-visualize)
(key-chord-define-global "yy" nil)
(key-chord-define-global "jl" nil)
(key-chord-define-global "vv" 'browse-kill-ring)
(global-set-key (kbd "\C-c c") 'comment-or-uncomment-region)

                                        ; to transpose words backwards without having to type the negative argument
(global-set-key (kbd "M-T") "\C-u\ -1\ \M-t")


(global-set-key (kbd "M-§") 'other-frame)

; Ace-jump
(key-chord-define-global "hh" 'ace-jump-mode-pop-mark)
(key-chord-define-global "jk" 'ace-jump-word-mode)

(key-chord-define-global "jj" 'ace-jump-char-mode)

(key-chord-define-global "kl" 'iy-go-to-char)
(key-chord-define-global "km" 'iy-go-to-char-backward)
(global-set-key (kbd "\C-å") 'iy-go-to-char-continue)


; Autocomplete
;(global-auto-complete-mode t)
;(add-to-list 'ac-dictionary-directories "~/notes/ac-dict")
(require 'auto-complete-config)
(ac-config-default)
(setq ac-menu-height 9)
(setq ac-source-yasnippet nil)

(setq ac-auto-start 2)
(setq ac-ignore-case nil)

; Change yasnippet binding
(require 'yasnippet)
(yas-global-mode t)
(define-key yas-minor-mode-map (kbd "<tab>") nil)
(define-key yas-minor-mode-map (kbd "TAB") nil)
(define-key yas-minor-mode-map (kbd "C-<tab>") 'yas-expand)
(setq yas-prompt-functions '(yas-ido-prompt))
;; Add custom snippets

(setq yas-snippet-dirs (append yas-snippet-dirs
                               '("~/konffit/yasnippets")))


(require 'dired-details)
(dired-details-install)
(setq-default dired-details-hidden-string "")

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
(key-chord-define-global "jn" 'mc/mark-more-like-this-extended)
(key-chord-define-global "jt" 'mc/mark-sgml-tag-pair)
(key-chord-define-global "jg" 'mc/mark-all-like-this)
(global-unset-key (kbd "M-<down-mouse-1>"))
(global-set-key (kbd "M-<mouse-1>") 'mc/add-cursor-on-click)
(global-set-key (kbd "C-<") 'mc/edit-beginnings-of-lines)

; Copy current buffer path to clipboard
(define-key prelude-mode-map (kbd "\C-c w") 'prelude-copy-file-name-to-clipboard)

;;; Dired
;; allow dired to be able to delete or copy a whole dir.
(setq dired-recursive-copies (quote always)) ; “always” means no asking
(setq dired-recursive-deletes (quote top)) ; “top” means ask once
;; Use split window as default copy/rename target
(setq dired-dwim-target t)

;; {{ copy the file-name/full-path in dired buffer into clipboard
;; `w` => copy file name
;; `C-u 0 w` => copy full path
(defadvice dired-copy-filename-as-kill (after dired-filename-to-clipboard activate)
  (with-temp-buffer
    (insert (current-kill 0))
    (shell-command-on-region (point-min) (point-max)
                             (cond
                              ((eq system-type 'cygwin) "putclip")
                              ((eq system-type 'darwin) "pbcopy")
                              (t "xsel -ib")
                              )))
  (message "%s copied to clipboard" (current-kill 0))
  )

;;; Org-mode
(global-set-key "\C-x\C-o" 'org-capture)
(global-set-key "\C-x\C-a" 'org-agenda)
;(global-set-key "\C-c\C-cl" 'org-store-link)
;(global-set-key "\C-c\C-cb " 'org-iswitchb)
(setq org-default-notes-file  "~/notes/notetoself.org")

(add-hook 'org-mode-hook
          (lambda ()
            (org-indent-mode t)
            (visual-line-mode t)
            (local-unset-key "<C-M-down>")
            (local-set-key "<C-M-down>" 'org-move-subtree-down)
            (local-unset-key "<C-M-up>")
            (local-set-key "<C-M-up>" 'org-move-subtree-up)
            (add-to-list 'org-modules 'habits)
            )
          t)

;; Add nice colours to src blocks

;; fontify code in code blocks
(setq org-src-fontify-natively t)

(defface org-block-background
  '((t (:background "#EBEBEB")))
  "Face used for the source block background.")

;;; Python
; Elpy
(elpy-enable)


;; HTML
; Emmet
(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'sgml-mode-hook
          (lambda ()
            (progn
              (emmet-mode)
              )))
(add-hook 'css-mode-hook  'emmet-mode)
(eval-after-load "emmet-mode"
  '(define-key emmet-mode-keymap (kbd "C-j") nil))
; Indent 2 spaces.

(add-hook 'emmet-mode-hook (lambda () 
                             (setq emmet-indentation 4)
                             (local-set-key (kbd "<backtab>") 'emmet-expand-line)))


(setq emmet-move-cursor-between-quotes t)

;; Javascript
(setq js-indent-level 4)
(setq-default js2-basic-offset 4)
(add-to-list 'auto-mode-alist (cons (rx ".js" eos) 'js2-mode))

(setq inferior-js-program-command "node")
(add-hook 'js2-mode-hook '(lambda () 
                            (local-set-key "\C-x\C-e" 
                                           'js-send-last-sexp)
                            (local-set-key "\C-\M-x" 
                                           'js-send-last-sexp)
                            ;(local-unset-key "\C-c e")
                            (local-set-key "\C-c\C-b" 
                                          'js-send-buffer)
                            ;(local-set-key "\C-c\C-b" 
                            ;               'js-send-buffer-and-go)
                            (local-set-key "\C-cl" 
                                           'js-load-file-and-go)
                            ))

;; Lisp
(setq inferior-lisp-program "/usr/local/bin/clisp")

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

(defun vi-open-line-below ()
  "Insert a newline below the current line and put point at beginning."
  (interactive)
  (unless (eolp)
    (end-of-line))
  (newline-and-indent))

(global-set-key (kbd "C-o") 'vi-open-line-below)
(global-set-key (kbd "C-S-o") 'vi-open-line-above)

;; http://demonastery.org/2013/04/emacs-narrow-to-region-indirect/
(defun narrow-to-region-indirect (start end)
  "Restrict editing in this buffer to the current region, indirectly."
  (interactive "r")
  (deactivate-mark)
  (let ((buf (clone-indirect-buffer nil nil)))
    (with-current-buffer buf
      (narrow-to-region start end))
    (switch-to-buffer buf)))
(global-set-key (kbd "\C-c b") 'narrow-to-region-indirect)


(provide 'emacsrc)

;;; emacsrc.el ends here

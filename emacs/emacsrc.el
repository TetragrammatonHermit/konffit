;;; custom --- config
;;; Commentary:
;;  This is a bad example of an emacs configuration file, because I haven't had time to structure and comment it properly.
;;; Code:

;;;; General


;; Start daemon
(load "server")

(unless (server-running-p) (server-start))

(x-focus-frame nil)
                                        ; Disable scroll bars
(scroll-bar-mode -1)
                                        ; Make OSX special characters work
(setq mac-option-modifier 'nil
      mac-command-modifier 'meta
      x-select-enable-clipboard t)

;; Nicer mousewheel scrolling
(setq mouse-wheel-scroll-amount '(1 ((shift) . 1) ((control) . nil)))
(setq mouse-wheel-progressive-speed nil)

;; Change "tabs" like in chromium / sublimetext etc
(window-numbering-mode t)

(defun toggle-mode-line () ; "toggles the modeline on and off"
  (interactive)
  (setq mode-line-format
        (if (equal mode-line-format nil)
            (default-value 'mode-line-format)) )
  (redraw-display))
(global-set-key [M-f12] 'toggle-mode-line)

; Make scratch-buffer more convenient
(setq initial-scratch-message "")
(setq initial-major-mode 'text-mode)

;; Theming
(defun buffer-face-variable-width () ;;TODO: call on writeroom hook
  "Sets a non fixed width font in current buffer"
  (interactive)
  (setq buffer-face-mode-face '(:family "Droid Sans") )
  (buffer-face-mode))
(defun buffer-face-monospaced ()
  "Sets a non fixed width font in current buffer"
  (interactive)
  (setq buffer-face-mode-face '(:family "Droid Sans Mono") )
  (buffer-face-mode))

(set-face-attribute 'default nil :font "Droid Sans Mono-10")
(disable-theme 'zenburn)


;(load-theme 'solarized-light t)
(load-theme 'monokai)
(set-cursor-color "white")
(set-default 'cursor-type 'bar)

;; Keybindings for day/night themes
(global-set-key [H-end] '(lambda () (interactive)
                           (disable-theme 'solarized-light)
                           (disable-theme 'solarized-dark)
                           (load-theme 'monokai)
                           (set-cursor-color "white")))
(global-set-key [H-home] '(lambda () (interactive)
                            (disable-theme 'monokai)
                            (load-theme 'solarized-light)
                            (set-cursor-color "black")))

;; Disable bleep at fail
(setq ring-bell-function 'ignore)

(set-language-environment "UTF-8")

                                        ; Magit use current window (use emacsclient of current installation)
(set-variable 'magit-emacsclient-executable "/usr/sbin/emacsclient")

                                        ; Setup emerge as mergetool
(setq emerge-diff-options "--ignore-all-space")


                                        ; Use Chromium as 'default' browser
(setq browse-url-browser-function 'browse-url-generic
      browse-url-generic-program "chromium")

;; Use conkeror as default browser
;;(setq browse-url-generic-program (executable-find "conkeror"))
;;(setq browse-url-browser-function 'browse-url-generic)


;; Set transparency of emacs
(defun transparency (value)
  "Set the transparency of the frame window.  VALUE = 0-100."
  (interactive "nTransparency Value 0 - 100 opaque:")
  (set-frame-parameter (selected-frame) 'alpha value))
;(transparency 90)

(smartparens-global-mode +1)
(key-chord-mode 1)
                                        ;(setq key-chord-two-keys-delay 0.00125)
(setq prelude-flyspell nil)             ; Disable spell checking
(setq prelude-guru nil)
                                        ; Disable whitespace-mode
(setq prelude-whitespace nil)

(require 'google-translate)
(global-set-key (kbd "C-x t") 'google-translate-at-point)
(global-set-key (kbd "C-x T") 'google-translate-at-point-reverse)
(setq google-translate-enable-ido-completition t)
(setq google-translate-default-target-language '"en")
(setq google-translate-default-source-language '"fi")
(set-face-attribute 'google-translate-translation-face nil :height 2)

;; Minibuffer autocompletition with ido-mode and sme
;; http://www.masteringemacs.org/articles/2010/10/10/introduction-to-ido-mode/
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)
(setq ido-use-filename-at-point 'guess)
(ido-mode t)
(global-set-key (kbd "M-x") nil)
(global-set-key (kbd "M-x") 'smex)



                                        ; Prelude stole some default keybindings
(key-chord-define-global "uu" nil)
                                        ;(key-chord-define-global "zz" 'undo-tree-visualize)
(key-chord-define-global "yy" nil)
                                        ;(key-chord-define-global "jl" nil)
(key-chord-define-global "vv" 'browse-kill-ring)
(global-set-key (kbd "C-c c") 'comment-or-uncomment-region)
(global-set-key (kbd "C-\"") 'er/expand-region)

;; to transpose words backwards without having to type the negative argument
;; (global-set-key (kbd "M-T") "C-u\ -1\ \M-t")

(global-set-key (kbd "M-§") 'other-frame)

;; Pop marks faster
(setq set-mark-command-repeat-pop 't)

(key-chord-define-global "hh" 'pop-to-mark-command)
(key-chord-define-global "jk" 'ace-jump-word-mode)
(key-chord-define-global "jj" 'ace-jump-char-mode)
(key-chord-define-global "kl" 'iy-go-to-char)
(key-chord-define-global "ds" 'iy-go-to-char-backward)
(setq iy-go-to-char-kill-ring-save t)

(key-chord-define-global "kd" 'mc/edit-lines)

                                        ;(key-chord-define-global "ff" 'iy-go-to-char-kill-region) TODO howto


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
                               '("~/konffit/emacs/yasnippets")))

(setq projectile-enable-caching t)

(require 'dired-details)
(dired-details-install)
(setq-default dired-details-hidden-string "")

(defun dired-open-mac ()
  "Open file from dired buffer with OSX default program."
  (interactive)
  (let ((file-name (dired-get-file-for-visit)))
    (if (file-exists-p file-name)
        (call-process "/usr/bin/thunar" nil 0 nil file-name))))

(add-hook 'dired-mode-hook
          '(lambda ()
             (define-key dired-mode-map "o" 'dired-open-mac)))

;; Acme search
(global-set-key [(mouse-3)] 'acme-search-forward)
(global-set-key [(shift mouse-3)] 'acme-search-backward)

;; Guide key https://github.com/kbkbkbkb1/guide-key
(setq guide-key/guide-key-sequence '("C-x 4"))
(guide-key-mode 1)  ; Enable guide-key-mode

;; Visual regexp
(define-key global-map (kbd "C-c C-r") 'vr/replace)
(define-key global-map (kbd "C-c C-q") 'vr/query-replace)
(define-key global-map (kbd "C-c m") 'vr/mc-mark)
;; to use visual-regexp-steroids's isearch instead of the built-in regexp isearch,s also include the following lines:
;(define-key esc-map (kbd "C-r") 'vr/isearch-backward) ;; C-M-r
;(define-key esc-map (kbd "C-s") 'vr/isearch-forward) ;; C-M-s

;; Multiple cursors
(key-chord-define-global "jn" 'mc/mark-more-like-this-extended)
(key-chord-define-global "jt" 'mc/mark-sgml-tag-pair)
(global-unset-key (kbd "M-<down-mouse-1>"))
(global-set-key (kbd "M-<mouse-1>") 'mc/add-cursor-on-click)
(global-set-key (kbd "H-<mouse-1>") 'mc/add-cursor-on-click)


                                        ; Copy current buffer path to clipboard
(define-key prelude-mode-map (kbd "C-c w") 'prelude-copy-file-name-to-clipboard)

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


(global-flycheck-mode t)


;;; Org-mode
(global-set-key (kbd "C-x a") 'org-capture)
(global-set-key (kbd "C-x C-a") 'org-agenda)
                                        ;(global-set-key "\C-c\C-cl" 'org-store-link)
                                        ;(global-set-key "\C-c\C-cb " 'org-iswitchb)
(setq org-default-notes-file  "~/notes/todo.org")

                                        ;(setq org-ctrl-k-protect-subtree t)
(setq org-catch-invisible-edits 'show)

;; Set todo item states
(setq org-todo-keywords
      '((sequence "TODO(t)" "WAIT(w)" "|" "DONE(d)")))

;; TODO: set ax-tiddly.el?
;; (setq org-export-backends (quote (
;;                                   tiddly
;;                                   ascii
;;                                   html
;;                                   latex
;;                                   odt)))

(add-hook 'org-mode-hook
          (lambda ()
            (org-indent-mode t)
            (visual-line-mode t)

                                        ;(add-to-list 'org-modules 'habits)
            (local-set-key "\M-\C-g" 'org-plot/gnuplot)
            ;;(local-unset-key "<C-M-down>")
            ;;(local-set-key "<C-M-down>" 'org-move-subtree-down)
            ;;(local-unset-key "<C-M-up>")
            ;;(local-set-key "<C-M-up>" 'org-move-subtree-up)
            )
          t)

;; Add syntax highlight to src blocks
(setq org-src-fontify-natively t)

(defface org-block-background
  '((t (:background "#EBEBEB")))
  "Face used for the source block background.")

;;; Python
                                        ; Elpy
(elpy-enable)


;; HTML
                                        ; Emmet
                                        ;(setq sgml-basic-offset 4)
                                        ;(setq tab-width 4) not used

(add-hook 'html-mode-hook
          (lambda()
            (setq sgml-basic-offset 4)
            t))

(defadvice sgml-delete-tag (after reindent-buffer activate)
  (prelude-cleanup-buffer))

(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'sgml-mode-hook
          (lambda ()
            (progn
              (emmet-mode)
              )))
(add-hook 'css-mode-hook  'emmet-mode)
(eval-after-load "emmet-mode"
  '(define-key emmet-mode-keymap (kbd "C-j") nil))
                                        ; Indent spaces.

(add-hook 'emmet-mode-hook (lambda ()
                             (setq emmet-indentation 4)
                             (local-set-key (kbd "<backtab>") 'emmet-expand-line)))


(setq emmet-move-cursor-between-quotes t)

;; Javascript

;; js2-mode with autocomplete
(require 'js2-mode)
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))
(defun my-js2-mode-hook ()
"Custom keybindings for js2-mode"
  (define-key js2-mode-map [(meta control \;)] 
    '(lambda()
       (interactive)
       (insert "/* -----[ ")
       (save-excursion
         (insert " ]----- */"))
       ))
  (define-key js2-mode-map [(return)] 'newline-and-indent)
  (define-key js2-mode-map [(backspace)] 'c-electric-backspace)
  (define-key js2-mode-map [(control d)] 'c-electric-delete-forward)
  (message "My JS2 hook"))

(add-hook 'js2-mode-hook 'my-js2-mode-hook)
(add-hook 'js2-mode-hook 'ac-js2-mode)

;(define-key js2-mode-map [(backspace)] 'c-electric-backspace)

;; (define-key js2-mode-map [("C-c c")] 
(define-key js2-mode-map [(return)] 'newline-and-indent)
(define-key js2-mode-map [(backspace)] 'c-electric-backspace)
;; (define-key js2-mode-map [("C-c c")]
;;   '(lambda()
;;      (interactive)
;;      (insert "/* -----[ ")
;;      (save-excursion
;;        (insert " ]----- */"))
;;      ))


;; Lisp
(setq inferior-lisp-program "/usr/local/bin/clisp")

;; Haskell
;;(add-hook 'haskell-mode-hook 'turn-on-haskell-unicode-input-method)
(add-hook 'haskell-mode-hook 'turn-on-haskell-doc)
(add-hook 'haskell-mode-hook 'turn-on-haskell-indent)

;; Set tag browser
(add-hook 'haskell-mode-hook 'turn-on-haskell-decl-scan)
(add-hook 'haskell-mode-hook 'imenu-add-menubar-index)

(eval-after-load 'flycheck '(require 'flycheck-hdevtools))

;;Set REPL
;; (eval-after-load "haskell-mode"
;;   '(progn
;;      (define-key haskell-mode-map (kbd "C-x C-d") nil)
;;      (define-key haskell-mode-map (kbd "C-c C-z") 'haskell-interactive-switch)
;;      (define-key haskell-mode-map (kbd "C-c C-l") 'haskell-process-load-file)
;;      (define-key haskell-mode-map (kbd "C-c C-b") 'haskell-interactive-switch)
;;      (define-key haskell-mode-map (kbd "C-c C-t") 'haskell-process-do-type)
;;      (define-key haskell-mode-map (kbd "C-c C-i") 'haskell-process-do-info)
;;      (define-key haskell-mode-map (kbd "C-c M-.") nil)
;;      (define-key haskell-mode-map (kbd "C-c C-d") nil)))

;; (add-hook 'haskell-mode-hook 'turn-on-haskell-simple-indent)

;; (speedbar-add-supported-extension ".hs")
; setup ghc-mod
;; (autoload 'ghc-init "ghc" nil t)
;; (add-hook 'haskell-mode-hook (lambda () (ghc-init)))
;;; Other

                                        ; Latex
(add-hook 'LaTeX-mode-hook 'turn-on-reftex)
(setq reftex-plug-into-AUCTeX t)
(setq-default ispell-program-name "aspell")

;;;;; Custom functions
(defun save-and-reload () "Save and reload browser." (interactive)
       (save-buffer)
       (shell-command "chrome-reload")
       )
(define-key global-map (kbd "C-x r") 'save-and-reload)


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
(global-set-key (kbd "C-c b") 'narrow-to-region-indirect)

;; Hide compilation buffer eg after sass scss compilation on file save
(defun bury-compile-buffer-if-successful (buffer string)
  "Bury a compilation buffer if succeeded without warnings."
  (if (and
       (string-match "compilation" (buffer-name buffer))
       (string-match "finished" string)
       (not
        (with-current-buffer buffer
          (search-forward "warning" nil t))))
      (run-with-timer 1 nil
                      (lambda (buf)
                        (bury-buffer buf)
                        (switch-to-prev-buffer (get-buffer-window buf) 'kill))
                      buffer)))
(add-hook 'compilation-finish-functions 'bury-compile-buffer-if-successful)

(provide 'emacsrc)

;;; emacsrc.el ends here

;; Setup programming and markup language modes

(prelude-require-packages '(yasnippet
                            auto-complete
                            flycheck

                            angular-snippets

                            elpy
                            jedi
                            flycheck-pyflakes

                            emmet-mode
                            ac-emmet
                                        ;csharp-mode
                            js2-mode
                            ac-js2
                            json-mode
                            json-reformat
                                        ;js2-refactor
                            web-beautify
                            ;flymake
                            ;flymake-go
                            go-errcheck
                            go-snippets
                            
                            skewer-mode
                                        ;skewer-reload-stylesheets
                            slime
                                        ; utils
                            s
                            dash
                            conkeror-minor-mode
                            ))
;; http://flycheck.readthedocs.org/en/latest/guide/quickstart.html

;; Change yasnippet binding
(require 'yasnippet)
(yas-global-mode t)
(define-key yas-minor-mode-map (kbd "<tab>") nil)
(define-key yas-minor-mode-map (kbd "TAB") nil)
(define-key yas-minor-mode-map (kbd "C-<tab>") 'yas-expand)
(setq yas-prompt-functions '(yas-ido-prompt))
(setq yas-snippet-dirs (append yas-snippet-dirs
                               '("~/konffit/emacs/yasnippets")))

;;(global-flycheck-mode t)

(require 'auto-complete-config)
;; Autocomplete-mode
;;(global-auto-complete-mode t)
;;(add-to-list 'ac-dictionary-directories "~/notes/ac-dict")
(ac-config-default)
(setq ac-menu-height 9)
(setq ac-source-yasnippet 'nil)

(setq ac-auto-start 2)
(setq ac-ignore-case nil)

;;; advice for whitespace-mode conflict
(defvar my-prev-whitespace-mode nil)
(make-variable-buffer-local 'my-prev-whitespace-mode)

(defadvice popup-draw (before my-turn-off-whitespace)
  "Turn off whitespace mode before showing autocomplete box"
  (make-local-variable 'my-prev-whitespace-mode)
  (if whitespace-mode
      (progn
        (setq my-prev-whitespace-mode t)
        (whitespace-mode -1))
    (setq my-prev-whitespace-mode nil)))

(defadvice popup-delete (after my-restore-whitespace)
  "Restore previous whitespace mode when deleting autocomplete box"
  (if my-prev-whitespace-mode
      (whitespace-mode 1)))

(ad-activate 'popup-draw)
(ad-activate 'popup-delete)


;;; Python
(require 'elpy)
(elpy-enable)
                                        ;(elpy-enable) TODO: fix

(elpy-use-ipython)
(setq jedi:complete-on-dot t)

(add-hook 'python-mode-hook
          (lambda ()
            (abbrev-mode 1)
            (auto-fill-mode 1)
            (linum-mode 1)
            (whitespace-mode)
            (jedi:setup)
            (if (eq window-system 'x)
                (font-lock-mode 1))))

;;;; Webdev
;; HTML
(add-hook 'html-mode-hook
          (lambda()
            (setq sgml-basic-offset 2)
            t))

;; Reindent after deleting tags
(defadvice sgml-delete-tag (after reindent-buffer activate)
  (prelude-cleanup-buffer))

;; Emmet
(require 'emmet-mode)
(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'css-mode-hook  'emmet-mode)

(eval-after-load "emmet-mode"
  '(define-key emmet-mode-keymap (kbd "C-j") nil))

(add-hook 'emmet-mode-hook (lambda ()
                             (setq emmet-indentation 2)
                             (local-set-key (kbd "<backtab>") 'emmet-expand-line)))
 `
(setq emmet-move-cursor-between-quotes t)

(require 'ac-emmet)
(add-hook 'sgml-mode-hook 'ac-emmet-html-setup)
(add-hook 'css-mode-hook 'ac-emmet-css-setup)


(defun unhtml (start end)
  (interactive "r")
  (save-excursion
    (save-restriction
      (narrow-to-region start end)
      (goto-char (point-min))
      (replace-string "&" "&amp;")
      (goto-char (point-min))
      (replace-string "<" "&lt;")
      (goto-char (point-min))
      (replace-string ">" "&gt;")
      )))


;; Javascript

;; js2-mode with autocomplete
(require 'js2-mode)
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))

(defun my-js2-mode-hook ()
  (define-key js2-mode-map [(return)] 'newline-and-indent)
  (define-key js2-mode-map [(backspace)] 'c-electric-backspace)
  (define-key js2-mode-map [(control d)] 'c-electric-delete-forward)
  (whitespace-mode +1)
  (message "My JS2 hook"))

(add-hook 'js2-mode-hook 'my-js2-mode-hook)
(add-hook 'js2-mode-hook 'ac-js2-mode)

(custom-set-variables
 '(js2-basic-offset 4)
 '(js2-bounce-indent-p 'nil)
 )

(add-hook 'js2-mode-hook 'skewer-mode)
(add-hook 'css-mode-hook 'skewer-css-mode)
(add-hook 'html-mode-hook 'skewer-html-mode)

;;;; Shell
;;(require 'flymake-shell)
(defun my-shell-mode-hook ()
  (whitespace-mode +1)
  (flycheck-mode)
  (message "My shell-mode hook"))
(add-hook 'sh-mode-hook 'my-shell-mode-hook)

;; Lisp
(setq inferior-lisp-program "/usr/bin/sbcl")

;;;; GO
(setenv "GOPATH" "/home/jasalt/.golang/packages")
(setenv "PATH" (concat (getenv "PATH") ":" "/home/jasalt/.golang/packages/bin"))
(setq exec-path (append exec-path (list (expand-file-name "/home/jasalt/.golang/packages/bin"))))

(add-to-list 'load-path "~/konffit/emacs/prelude-personal/modes") ;; TODO get from elpa

;;(require 'go-flycheck)
;;(defun my-go-hook ()
;;  (local-set-key (kbd "RET") 'newline-and-indent))
;;(add-hook 'go-mode-hook 'my-go-hook)

;; Haskell
;;(add-hook 'haskell-mode-hook 'turn-on-haskell-unicode-input-method)
(add-hook 'haskell-mode-hook 'turn-on-haskell-doc)
(add-hook 'haskell-mode-hook 'turn-on-haskell-indent)

;; Set tag browser
(add-hook 'haskell-mode-hook 'turn-on-haskell-decl-scan)
(add-hook 'haskell-mode-hook 'imenu-add-menubar-index)

                                        ;(eval-after-load 'flycheck '(require 'flycheck-hdevtools))

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

;; Latex

;;(add-hook 'LaTeX-mode-hook 'turn-on-reftex)
;;(setq reftex-plug-into-AUCTeX t)
;;(setq-default ispell-program-name "aspell")

(add-to-list 'load-path "~/site-elisp/")

; ***Base config
; Setup EL-GET package manager
(add-to-list 'load-path "~/.emacs.d/el-get/el-get")
(unless (require 'el-get nil 'noerror)
  (with-current-buffer
      (url-retrieve-synchronously
       "https://raw.github.com/dimitri/el-get/master/el-get-install.el")
    (goto-char (point-max))
    (eval-print-last-sexp)))
(add-to-list 'el-get-recipe-path "~/.emacs.d/el-get-user/recipes")
(el-get 'sync)

; Set lisp-package sources
(require 'package)
(package-initialize)
(setq package-archives '(
    ("gnu" . "http://elpa.gnu.org/packages/")
    ("marmalade" . "http://marmalade-repo.org/packages/")
    ("melpa" . "http://melpa.milkbox.net/packages/"))
)

; Add path (to make pyflakes etc work)
(add-to-list 'exec-path "/usr/local/bin/")

; *** Editor behaviour
(scroll-bar-mode -1)
(tool-bar-mode -1)

;; Hide splash-screen and startup-message
(setq inhibit-splash-screen t)
(setq inhibit-startup-message t)

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


; *** Keybindings
; Mac keybindings for international kb
(setq mac-option-modifier 'none)
(setq mac-command-modifier 'meta)

;*** Mode/Plugin specific

; Acejump (quick movement)
(require 'ace-jump-mode)
(define-key global-map (kbd "C-c C-SPC") 'ace-jump-mode)

; Multiple cursors
(add-to-list 'load-path "~/site-elisp/multiple-cursors/")
(require 'multiple-cursors)
(global-set-key (kbd "C-<") 'mc/mark-next-like-this)
(global-set-key (kbd "C->") 'mc/mark-previous-like-this)
; Add cursor to every line in selection
(global-set-key (kbd "C-S-c C-S-c") 'mc/edit-lines)

; Autopair
(add-to-list 'load-path "~/site-elisp/autopair/")
(require 'autopair)
(autopair-global-mode) ;; enable autopair in all buffers

; Yasnippet (snippets) (TODO: optimize load time)
(require 'yasnippet)
(yas-global-mode 1)
(global-set-key (kbd "C-c s") 'yas/insert-snippet)

; Stock ido-mode for autocompletition
;(require 'ido)
;(ido-mode t)

; Helm (good autocomplete framework or whatever)
(require 'helm-config)
(global-set-key (kbd "C-c h") 'helm-mini)
(helm-mode 1)

; Connect Yasnippet with Helm
(defun shk-yas/helm-prompt (prompt choices &optional display-fn)
    "Use helm to select a snippet. Put this into `yas/prompt-functions.'"
    (interactive)
    (setq display-fn (or display-fn 'identity))
    (if (require 'helm-config)
        (let (tmpsource cands result rmap)
          (setq cands (mapcar (lambda (x) (funcall display-fn x)) choices))
          (setq rmap (mapcar (lambda (x) (cons (funcall display-fn x) x)) choices))
          (setq tmpsource
                (list
                 (cons 'name prompt)
                 (cons 'candidates cands)
                 '(action . (("Expand" . (lambda (selection) selection))))
                 ))
          (setq result (helm-other-buffer '(tmpsource) "*helm-select-yasnippet"))
          (if (null result)
              (signal 'quit "user quit!")
            (cdr (assoc result rmap))))
      nil))

; Set Yasnippet to use Helm as prompt
(setq yas-prompt-functions '(shk-yas/helm-prompt yas-ido-prompt yas-no-prompt))

; Orgmode code region syntax highlight
(setq org-src-fontify-natively t)

; ELPY Python IDE mode
; Set PYTHONPATH, because we don't load .bashrc. (TODO: needed?)
(setenv "PYTHONPATH" "/usr/local/lib/python2.7/site-packages:/usr/local/bin/:")
(elpy-enable)

; Arduino
(add-to-list 'load-path "~/site-elisp/arduino-mode/")
(setq auto-mode-alist (cons '("\\.\\(pde\\|ino\\)$" . arduino-mode) auto-mode-alist))
(autoload 'arduino-mode "arduino-mode" "Arduino editing mode." t)

; Javascript
(add-to-list 'load-path "~/site-elisp/js2-mode/")
(autoload 'js2-mode "js2" nil t)
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))
; Autocompletemode for javascript
(add-to-list 'load-path "~/site-elisp/auto-complete")
(require 'auto-complete-config)
(add-to-list 'ac-dictionary-directories "~/site-elisp/auto-complete/dict")
(setq-default ac-sources (add-to-list 'ac-sources 'ac-source-dictionary))
(global-auto-complete-mode t)
; Start auto-completion after 2 characters of a word
(setq ac-auto-start 2)
; case sensitivity is important when finding matches
(setq ac-ignore-case nil)
;Use yasnippet
(add-to-list 'ac-sources 'ac-source-yasnippet)
(define-key ac-mode-map (kbd "C-TAB") 'auto-complete)
(ac-set-trigger-key "TAB")

; AngularJS Snippets
(require 'angular-snippets)
(eval-after-load "sgml-mode"
  '(define-key html-mode-map (kbd "C-c C-d") 'ng-snip-show-docs-at-point))

; HTML
(require 'emmet-mode)
(add-hook 'sgml-mode-hook 'emmet-mode) ;; Auto-start on any markup modes
(add-hook 'css-mode-hook  'emmet-mode) ;; enable Emmet's css abbreviation.
(add-hook 'emmet-mode-hook (lambda () (setq emmet-indentation 2))) ;indent 2 spaces.


(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(ansi-color-names-vector ["#3F3F3F" "#CC9393" "#7F9F7F" "#F0DFAF" "#8CD0D3" "#DC8CC3" "#93E0E3" "#DCDCCC"])
 '(custom-safe-themes (quote ("fc6e906a0e6ead5747ab2e7c5838166f7350b958d82e410257aeeb2820e8a07a" "d677ef584c6dfc0697901a44b885cc18e206f05114c8a3b7fde674fce6180879" default)))
 '(fci-rule-color "#383838")
 '(vc-annotate-background "#2B2B2B")
 '(vc-annotate-color-map (quote ((20 . "#BC8383") (40 . "#CC9393") (60 . "#DFAF8F") (80 . "#D0BF8F") (100 . "#E0CF9F") (120 . "#F0DFAF") (140 . "#5F7F5F") (160 . "#7F9F7F") (180 . "#8FB28F") (200 . "#9FC59F") (220 . "#AFD8AF") (240 . "#BFEBBF") (260 . "#93E0E3") (280 . "#6CA0A3") (300 . "#7CB8BB") (320 . "#8CD0D3") (340n . "#94BFF3") (360 . "#DC8CC3"))))
 '(vc-annotate-very-old-color "#DC8CC3")

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )



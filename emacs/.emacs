(add-to-list 'load-path "~/site-elisp/")

;Editor behaviour
(scroll-bar-mode -1)
(tool-bar-mode -1)

; Set package sources
(require 'package)
(package-initialize)
(setq package-archives '(
    ("gnu" . "http://elpa.gnu.org/packages/")
    ("marmalade" . "http://marmalade-repo.org/packages/")
    ("melpa" . "http://melpa.milkbox.net/packages/"))
)

(load-theme 'zenburn t)

; Enable ido-mode for autocompletitions
(require 'ido)
(ido-mode t)



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

; Python
(elpy-enable)

; Javascript
(autoload 'js2-mode "js2" nil t)
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))

; Egg for Git
;(add-to-list 'load-path "~/site-elisp/egg/")
;(require 'egg)

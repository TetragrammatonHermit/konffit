;;; custom --- config
;;; Commentary:
;; all customizations happen here

;;;; General 
(x-focus-frame nil)
; Disable scroll bars
(scroll-bar-mode -1)
; Make OSX special characters work
(setq mac-option-modifier nil
      mac-command-modifier 'meta
      x-select-enable-clipboard t)
; Hack to whitespace mode tolerance
(setq whitespace-line-column 250)


;;; Keybindings
; Prelude stole some default keybindings
(key-chord-define-global "uu" nil)
(key-chord-define-global "jv" 'undo-tree-visualize)

; Ace-jump
(key-chord-define-global "hh" 'ace-jump-mode-pop-mark)
(key-chord-define-global "jk" 'ace-jump-word-mode)
(key-chord-define-global "jj" 'ace-jump-char-mode)



;;;; Package setup
(require 'package)
(add-to-list 'package-archives
             '("marmalade" .
               "http://marmalade-repo.org/packages/"))
(package-initialize)
(prelude-require-packages '(multiple-cursors
                            elpy
                            ecb
                            auto-complete
                            js2-mode
                            emmet-mode))


; Multiple cursors
(global-set-key (kbd "C-<") 'mc/mark-next-like-this)
(global-set-key (kbd "C->") 'mc/mark-previous-like-this)
(global-set-key (kbd "C-M-g") 'mc/mark-all-dwim)
(key-chord-define-global "jc" 'mc/mark-more-like-this-extended)
(global-unset-key (kbd "M-<down-mouse-1>"))
(global-set-key (kbd "M-<mouse-1>") 'mc/add-cursor-on-click)


;;;; Language specific major stuff

;;; Python
; Elpy 
(elpy-enable)

;;; Web Front End
;; HTML
; Emmet
(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'css-mode-hook  'emmet-mode)
; Indent 2 spaces.
(add-hook 'emmet-mode-hook (lambda () (setq emmet-indentation 2)))
(setq emmet-move-cursor-between-quotes t)

;; Javascript
; Default to js2-mode
(add-to-list 'auto-mode-alist (cons (rx ".js" eos) 'js2-mode))
(setq js-indent-level 2)
(setq-default js2-basic-offset 2)

;;; Other
; Latex
(add-hook 'LaTeX-mode-hook 'turn-on-reftex)
(setq reftex-plug-into-AUCTeX t)
(setq-default ispell-program-name "aspell")


(provide 'custom-config)
;;; custom-config.el ends here

;; Leftovers

;;(x-focus-frame ni)
;;(setq ring-bell-function 'ignore)
(smartparens-global-mode +1)


;; to transpose words backwards without having to type the negative argument
;; (global-set-key (kbd "M-T") "C-u\ -1\ \M-t")

;; Visual regexp
(define-key global-map (kbd "C-c C-r") 'vr/replace)
(define-key global-map (kbd "C-c C-q") 'vr/query-replace)
(define-key global-map (kbd "C-c m") 'vr/mc-mark)




                                        ;(global-set-key (kbd "C-o") 'vi-open-line-below)
                                        ;(global-set-key (kbd "C-S-o") 'vi-open-line-above)


;;; Ido replacement
;; (require 'icicles)
;; (icy-mode 1)

;; Menubar 
;; (require 'lacarte)
;; (global-set-key [menu] 'lacarte-execute-command)
;; (global-set-key [?\M-`] 'lacarte-execute-command) ;replace orig. command
;; (require 'fuzzy-match)
;;;

;; (eval-after-load "ace-jump-mode"
;;   '(add-to-list 'mc/cursor-specific-vars 'iy-go-to-char-start-pos)
;; )

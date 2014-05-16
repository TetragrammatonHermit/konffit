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

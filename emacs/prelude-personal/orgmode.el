 ;;; Org-mode
(global-set-key (kbd "H-c") 'org-capture)
(global-set-key (kbd "H-a") 'org-agenda)

;;(global-set-key "\C-c\C-cl" 'org-store-link)
;;(global-set-key "\C-c\C-cb " 'org-iswitchb)

(setq org-default-notes-file  "~/notes/todo.org")



(setq org-capture-templates
      '(("t" "Task / Chore" entry (file+headline "~/notes/todo.org" "Tasks")
         "* TODO %?\n  %i\n")
        ("w" "Shout to Twitter / Blog" entry (file+headline "~/notes/todo.org" "Shouts")
         "* TODO %?\n  %i\n")
        ("i" "Idea" entry (file+headline "~/notes/todo.org" "Ideas")
         "* %?\n  %i\n")
        ("u" "Usuko task" entry (file+headline "~/notes/usuko.org" "Tasks / Todo")
         "* TODO %?\n  %i\n ")
        ("o" "Tweaks to OS" entry (file+headline "~/notes/todo.org" "OS Tweak") "* %?\n  %i\n")
        ("b" "Buy" entry (file+headline "~/notes/todo.org" "Tasks")
         "* TODO Osta %?\n  %i\n")
        ("ö" "Random temp note to scratch outline" entry (file+headline "~/notes/todo.org" "Scratch")
         "* %?\n  %i\n")
        ("m" "Meeting / Appointment" entry (file+headline "~/notes/todo.org" "Appointments") "* TODO %?\n  %i\n")
        ("s" "Song" item (file+headline "~/notes/music.org" "New music")
         "%?\n  %i\n")
        ("j" "Journal entry" entry (file+datetree "~/notes/notetoself.org")
         "* %?\nEntered on %U\n  %i\n")
        ("d" "Dream" entry (file+headline "~/notes/notetoself.org" "Dreams") "* %U\n  %i\n%?")))

;; Set todo item states
(setq org-todo-keywords
      '((sequence "TODO(t)" "WAIT(w)" "|" "DONE(d)")))


;; (global-unset-key (kbd "<M-S-up>"))
;; (global-unset-key (kbd "<C-S-up>"))
;; (global-set-key (kbd "<M-S-up>") '(message "fuu"))
;; http://ergoemacs.org/emacs/emacs_set_keys_for_major_mode.html
(defun own-org-mode-hook ()
  "Modify keymaps and settings used by `org-mode'."

  (local-set-key (kbd "<H-up>") 'org-move-subtree-up) 
  (local-set-key (kbd "<H-down>") 'org-move-subtree-down) 
  
  ;; setup
  (setq org-catch-invisible-edits 'smart)
  (org-indent-mode t)
  (visual-line-mode t)
  ;; Add syntax highlight to src blocks
  (setq org-src-fontify-natively t)

  (setq org-export-backends (quote (
                                    md
                                    ascii
                                    html
                                        ;latex
                                    odt)))
  )
;; Enable hook when org-mode starts
(add-hook 'org-mode-hook 'own-org-mode-hook)


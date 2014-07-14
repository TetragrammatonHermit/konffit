;; After install replace builtin org with one from elpa!


(setq org-directory "~/notes/")
(setq org-default-notes-file  "~/notes/gtd.org")
(setq org-agenda-files '("~/notes/gtd.org"))

(setq org-mobile-directory "/Volumes/DUMPSSDER/Dropbox/Apps/MobileOrg")
(setq org-mobile-files '("~/notes/mobiletest.org" "~/notes/gtd.org"))
(setq org-mobile-inbox-for-pull "~/notes/incoming.org")


(setq org-use-fast-todo-selection t)
(setq org-use-fast-tag-selection t)
(setq org-catch-invisible-edits 'smart)

(prelude-require-package 'org-trello)

;; Emacs global keybindings
(global-set-key (kbd "H-c") 'org-capture)
(global-set-key (kbd "H-a") 'org-agenda)

;;(global-set-key "\C-c\C-cl" 'org-store-link)
;;(global-set-key "\C-c\C-cb " 'org-iswitchb)

;; http://ergoemacs.org/emacs/emacs_set_keys_for_major_mode.html
(defun own-org-mode-hook ()
  "Modify keymaps and settings used by `org-mode'."

  (local-set-key (kbd "<H-up>") 'org-move-subtree-up)
  (local-set-key (kbd "<H-down>") 'org-move-subtree-down)

  ;; Prefer thin cursor when writing
  ;; (set-default 'cursor-type 'bar)
  
  (visual-line-mode +1)
  (org-indent-mode +1)
    
  (defun org-zoom-headline ()
    ""
    (interactive)
    (org-tree-to-indirect-buffer)
    (other-window -1)
    (delete-other-windows)
    )
  (define-key org-mode-map (kbd "C-c z") 'org-zoom-headline)


  ;; Add syntax highlight to src blocks
  (prelude-require-package 'htmlize)
  (setq org-src-fontify-natively t)

  (setq org-export-backends (quote (
                                    md
                                    ascii
                                    html
                                    latex
                                    odt)))
  )

(add-hook 'org-mode-hook 'own-org-mode-hook)

(require 'org-protocol)

(setq org-capture-templates
      '(
        ;; Org-protocol
        ("w" "" (file+headline "~/notes/www.org" "Notes") "* %^{Title}\n\n  Source: %u, %c\n\n  %i")
        ("t" "Task / Chore" entry (file+headline "~/notes/gtd.org" "Tasks")
         "* TODO %?\n  %i\n")
        ("m" "Calendar" entry (file+headline "~/notes/gtd.org" "Tasks") "* APPT %?\n  %i\n")
        ("r" "Raw thought" entry (file+headline "~/notes/gtd.org" "Ideas")
         "* %?\n  %i\n")
        ("b" "Buy" entry (file+headline "~/notes/todo.org" "Task / Chore")
         "* TODO Osta %?\n  %i\n")
        ("o" "Tweaks to OS" entry (file+headline "~/notes/someday.org" "OS Tweak") "* %?\n  %i\n")
        ("s" "Song" item (file+headline "~/notes/music.org" "New music")
         "%?\n  %i\n")
        ("j" "Journal entry" entry (file+datetree "~/notes/notetoself.org")
         "* %?\nEntered on %U\n  %i\n")
        ("d" "Dream" entry (file+headline "~/notes/notetoself.org" "Dreams") "* %U\n  %i\n%?")))


(setq org-agenda-custom-commands
      '(("c" "Desk Work" tags "HOME" ;; (1) (2) (3) (4)
         ((org-agenda-files '("~/notes/gtd.org")) ;; (5)
          (org-agenda-sorting-strategy '(priority-up effort-down))) ;; (5) cont.
         ("~/computer.html")) ;; (6)
        ;; ...other commands here
        ("H" "Office and Home Lists"
         ((agenda)
          
          (tags-todo "JYU")
          (tags-todo "ONLINE")
          (tags-todo "HOME")
          (tags-todo "TOWN")
          (tags-todo "PUTKILAHTI")
          (tags-todo "FUN")))
        ("D" "Daily Action List"
         (
          (agenda "" ((org-agenda-ndays 1)
                      (org-agenda-sorting-strategy
                       (quote ((agenda time-up priority-down tag-up) )))
                      (org-deadline-warning-days 5)
                      ))))
        ))

(setq org-refile-targets (quote (("gtd.org" :maxlevel . 1) ("someday.org" :level . 2))))

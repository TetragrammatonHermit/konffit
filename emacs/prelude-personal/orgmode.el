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
(setq org-indent-mode t)

;; Emacs global keybindings
(global-set-key (kbd "C-C m") 'org-capture)
(global-set-key (kbd "C-C a") 'org-agenda)

;;(global-set-key "\C-c\C-cl" 'org-store-link)
;;(global-set-key "\C-c\C-cb " 'org-iswitchb)

;; http://ergoemacs.org/emacs/emacs_set_keys_for_major_mode.html
(defun own-org-mode-hook ()
  "Modify keymaps and settings used by `org-mode'."

  (local-set-key (kbd "<H-up>") 'org-move-subtree-up)
  (local-set-key (kbd "<H-down>") 'org-move-subtree-down)

  ;; Prefer thin cursor when writing
  (set-default 'cursor-type 'bar)
  
  (visual-line-mode t)

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
        ("i" "Idea" entry (file+headline "~/notes/someday.org" "Ideas")
         "* %?\n  %i\n")
        ("u" "Usuko task" entry (file+headline "~/notes/gtd.org" "Tasks / Todo")
         "* TODO %?\n  %i\n ")
        ("o" "Tweaks to OS" entry (file+headline "~/notes/someday.org" "OS Tweak") "* %?\n  %i\n")
        ("b" "Buy" entry (file+headline "~/notes/todo.org" "Tasks")
         "* TODO Osta %?\n  %i\n")
        ("ö" "Random temp note to scratch outline" entry (file+headline "~/notes/todo.org" "Scratch")
         "* %?\n  %i\n")
        ("m" "Meeting / Appointment" entry (file+headline "~/notes/gtd.org" "Tasks") "* APPT %?\n  %i\n")
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
          (tags-todo "TOWN")
          (tags-todo "HOME")
          (tags-todo "PUTKILAHTI")
          (tags-todo "PC")
          (tags-todo "EVENING")))
        ("D" "Daily Action List"
         (
          (agenda "" ((org-agenda-ndays 1)
                      (org-agenda-sorting-strategy
                       (quote ((agenda time-up priority-down tag-up) )))
                      (org-deadline-warning-days 5)
                      ))))
        ))

(setq org-refile-targets (quote (("gtd.org" :maxlevel . 1) ("someday.org" :level . 2))))

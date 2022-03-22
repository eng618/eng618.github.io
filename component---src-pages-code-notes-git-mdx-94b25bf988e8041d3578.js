"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[4769],{6206:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return i},default:function(){return g}});var n=a(3366),l=(a(7294),a(4983)),r=a(4295),o=["components"],i={},s=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",t)}},c=s("PageDescription"),m=s("AnchorLinks"),p=s("AnchorLink"),u=s("InlineNotification"),h={_frontmatter:i},d=r.Z;function g(e){var t=e.components,a=(0,n.Z)(e,o);return(0,l.kt)(d,Object.assign({},h,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(c,{mdxType:"PageDescription"},(0,l.kt)("p",null,"This page is designed to unify all the tips and tricks associated with using git. Please feel free to modify and update as needed.")),(0,l.kt)(m,{mdxType:"AnchorLinks"},(0,l.kt)(p,{mdxType:"AnchorLink"},"Commits"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Checkout"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Branching"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Clean"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Diff"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Excluding files"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Forking"),(0,l.kt)(p,{mdxType:"AnchorLink"},".gitignore"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Merge conflicts"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Undoing commits"),(0,l.kt)(p,{mdxType:"AnchorLink"},"Other Configurations")),(0,l.kt)("h2",null,"Commits"),(0,l.kt)("h3",null,"Amending a Commit Message"),(0,l.kt)("p",null,"Changing a commit message can cause lots of problems if not handled correctly. Only use the following if ",(0,l.kt)("strong",{parentName:"p"},"absolutely")," necessary."),(0,l.kt)("h3",null,"Local commits"),(0,l.kt)("p",null,"To open your editor, allowing you to change the commit message of the most recent commit:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git commit --amend\n")),(0,l.kt)("p",null,"Additionally, you can set the commit message directly in the command line with:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'git commit --amend -m "New commit message"\n')),(0,l.kt)("p",null,"…however, this can make multi-line commit messages or small corrections more cumbersome to enter."),(0,l.kt)(u,{kind:"warning",mdxType:"InlineNotification"},(0,l.kt)("p",null,"Make sure you don’t have any working directory changes before doing this or they can get committed too.")),(0,l.kt)("h3",null,"Remote commits"),(0,l.kt)("p",null,"Changing the message of a commit that you’ve already pushed to your remote branch"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Warning:")," be cautious about amending commits that you have already shared with other people. Amending commits essentially rewrites them to have different SHA IDs, which poses a problem if other people have copies of the old commit that you’ve rewritten. Anyone who has a copy of the old commit will need to re-synchronize their work with your newly re-written commit, which can sometimes be difficult, so make sure you coordinate with others when attempting to rewrite shared commit history, or just avoid rewriting shared commits altogether."),(0,l.kt)("p",null,"If you’ve already pushed your commit up to your remote branch, then you’ll need to force push the commit with"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git push <remote> <branch> --force\n")),(0,l.kt)("p",null,"Or"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git push <remote> <branch> -f\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Warning:")," force-pushing will overwrite the remote branch with the state of your local one. If there are commits on the remote branch that you don’t have in your local branch, you will lose those commits."),(0,l.kt)("h3",null,"Past Commits"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://stackoverflow.com/a/1186549/2218959"},"source")),(0,l.kt)("p",null,"You can use rebase to edit a past commit by passing the commit hash, with the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git rebase -i '<commit-hash>^'\n")),(0,l.kt)("p",null,"Once your editor is opened with the rebase dialog, put edit as the action word for that commit. Save and close. Open the project and make the changes you wanted to update to that commit. To keep the same commit message you have previously use:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git commit --all --amend --no-edit\n")),(0,l.kt)("p",null,"Now you can use ",(0,l.kt)("inlineCode",{parentName:"p"},"git rebase --continue")," and go a ",(0,l.kt)("inlineCode",{parentName:"p"},"git push -f")," to force push your changes to the remote repo."),(0,l.kt)("h2",null,"Checkout"),(0,l.kt)("p",null,"To check out a file form another branch:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git checkout <src-branch> -- <path/to/file>\n")),(0,l.kt)("h2",null,"Branching"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"I follow git branching naming convention outline in this ",(0,l.kt)("a",{parentName:"p",href:"https://gist.github.com/digitaljhelms/4287848"},"gist"))),(0,l.kt)("p",null,"List all branches including remotes"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git branch -a\n")),(0,l.kt)("h3",null,"Resetting local branch to match remote"),(0,l.kt)("p",null,"Setting your branch to exactly match the remote branch can be done in two steps:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git fetch origin\ngit reset --hard origin/master\n")),(0,l.kt)("p",null,"If you want to save your current branch’s state before doing this (just in case), you can do:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'git commit -a -m "Saving my work, just in case"\ngit branch my-saved-work\n')),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Tip: Also see git clean")),(0,l.kt)("h3",null,"Deleting a remote branch"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git push origin :<branch-name>\n")),(0,l.kt)("h3",null,"Local branches"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Sourced From:")," ",(0,l.kt)("a",{parentName:"p",href:"http://railsware.com/blog/2014/08/11/git-housekeeping-tutorial-clean-up-outdated-branches-in-local-and-remote-repositories/"},"Git housekeeping tutorial")),(0,l.kt)("p",null,"At first, list all local branches:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git branch\n")),(0,l.kt)("p",null,"We need to know what branches are already merged in “master” and can be easily removed:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git checkout master\ngit branch --merged\n")),(0,l.kt)("p",null,"Now, remove all outdated branches with:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git branch -d <branch-name-old-merged-feature>\n")),(0,l.kt)("p",null,"Next, decide what to do with not merged branches:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git branch --no-merged\n")),(0,l.kt)("p",null,"If some of them is just abandoned stuff that you don’t need anymore, remove it with “-D” option:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git branch -D old-abandoned-feature\n")),(0,l.kt)("h3",null,"References to remote branches"),(0,l.kt)("p",null,"After each git pull or git fetch command Git creates references to remote branches in local repository, but doesn’t clean up stale references."),(0,l.kt)("p",null,"List referenced remote branches:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git branch -r\n")),(0,l.kt)("p",null,"Clean-up outdated references:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git remote prune origin\n")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Tip: Update repository with: ",(0,l.kt)("inlineCode",{parentName:"p"},"git fetch -p")," and Git automatically prunes all stale references.")),(0,l.kt)("h3",null,"Remote branches"),(0,l.kt)("p",null,"Usually, remote repository is a big garbage heap of stale branches, if there is no responsible housekeeping person."),(0,l.kt)("p",null,"After previous ",(0,l.kt)("inlineCode",{parentName:"p"},"git remote prune origin")," we should have synched list of remote branches."),(0,l.kt)("p",null,"At first, we can find branches which are already merged in “master”:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git checkout master\n$ git branch -r --merged\n")),(0,l.kt)("p",null,"But this command does not provide much information. What if this branch is merged, but still used for feature development. Would be cool to know last commit date and author."),(0,l.kt)("p",null,"This magic snippet provides all required information:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'for branch in `git branch -r --merged | grep -v HEAD`; do echo -e `git show --format="%ci %cr %an" $branch | head -n 1` \\\\t$branch; done | sort -r\n')),(0,l.kt)("p",null,"Now, you can delete own remote branches, and ask other authors to clean-up theirs:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git push origin --delete branch-name\n")),(0,l.kt)("p",null,"Similar snippet for not merged branches:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'for branch in `git branch -r --no-merged | grep -v HEAD`; do echo -e `git show --format="%ci %cr %an" $branch | head -n 1` \\\\t$branch; done | sort -r\n')),(0,l.kt)("p",null,"This list should be reviewed more thoroughly to avoid losing important commits."),(0,l.kt)("h2",null,"Clean"),(0,l.kt)("p",null,"Perform a “dry run” of ",(0,l.kt)("inlineCode",{parentName:"p"},"git clean"),". This will show you which files are going to be removed without actually doing it."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git clean -n\n")),(0,l.kt)("p",null,"Remove untracked files from the current directory. The ",(0,l.kt)("inlineCode",{parentName:"p"},"-f")," (force) flag is required unless the clean.requireForce configuration option is set to false (it’s true by default). This will not remove untracked folders or files specified by .gitignore."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git clean -f\n")),(0,l.kt)("p",null,"Remove untracked files, but limit the operation to the specified path."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git clean -f <path>\n")),(0,l.kt)("p",null,"Remove untracked files and untracked directories from the current directory."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git clean -df\n")),(0,l.kt)("p",null,"Remove untracked files from the current directory as well as any files that Git usually ignores."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git clean -xf\n")),(0,l.kt)("h3",null,"Example"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Edit some existing files"),(0,l.kt)("li",{parentName:"ul"},"Add some new files"),(0,l.kt)("li",{parentName:"ul"},"Realize you have no idea what you’re doing")),(0,l.kt)("p",null,"Undo changes in tracked files"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git reset --hard\n")),(0,l.kt)("p",null,"Remove untracked files"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git clean -df\n")),(0,l.kt)("h2",null,"Diff"),(0,l.kt)("p",null,"Simply use ",(0,l.kt)("inlineCode",{parentName:"p"},"git diff")," and a file name to check difference between commited and non staged changes"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git diff FILE_NAME\n")),(0,l.kt)("p",null,"If you need to verify the difference of a file that is already staged use the following"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git diff --staged FILE_NAME\n")),(0,l.kt)("h3",null,"Git diff with opendiff"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://thomashunter.name/blog/set-opendiff-filemerge-as-your-git-diff-tool-on-os-x/"},"Source")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"mkdir ~/bin/\ntouch ~/bin/git-diff.sh\n")),(0,l.kt)("p",null,"The contents of the file will look like this:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'#!/bin/sh\n/usr/bin/opendiff "$2" "$5" -merge "$1"\n')),(0,l.kt)("p",null,"Once the script has been made, you’ll want it to be executable"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"chmod u+x ~/bin/git-diff.sh\n")),(0,l.kt)("p",null,"Finally, tell git that you want to set it up as your default merge tool:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git config --global diff.external ~/bin/git-diff.sh\n")),(0,l.kt)("p",null,"If you later decide you hate it, run this command to go back:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git config --global --unset diff.external\n")),(0,l.kt)("h2",null,"Excluding files"),(0,l.kt)("h3",null,"Ignoring tracked files in your local repo"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git update-index --skip-worktree SOME_FILE\n")),(0,l.kt)("p",null,"or"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git update-index --assume-unchanged SOME_FILE\n")),(0,l.kt)("p",null,"To undo assume unchanged"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git update-index --no-assume-unchanged SOME_FILE\n")),(0,l.kt)("p",null,"If using ",(0,l.kt)("inlineCode",{parentName:"p"},"assume-unchanged")," you can add the following to your ",(0,l.kt)("strong",{parentName:"p"},"~/.gitconfig")),(0,l.kt)("p",null,"This will allow you to use the alias ",(0,l.kt)("inlineCode",{parentName:"p"},"git ignored")," to list all excluded files"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'[alias]\n ignored = !git ls-files -v | grep "^[[:lower:]]"\n')),(0,l.kt)("h3",null,"Ignoring un-tracked files in your local repo"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Untested")),(0,l.kt)("p",null,"If you ever want to ignore a file from git, but don’t want to add it to the ",(0,l.kt)("strong",{parentName:"p"},".gitignore")," file, you can do it on your local copy by adding it to the file ",(0,l.kt)("strong",{parentName:"p"},".git/info/exclude")),(0,l.kt)("p",null,"I’ve setup an alias to do so, just add this to your ",(0,l.kt)("strong",{parentName:"p"},".gitconfig")," file under the ",(0,l.kt)("inlineCode",{parentName:"p"},"[alias]")," section"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"exclude = !sh -c 'echo \"$1\" >> .git/info/exclude' -\n")),(0,l.kt)("p",null,"Then you can execute:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git exclude SOME_FILE\n")),(0,l.kt)("h2",null,"Forking"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"http://stackoverflow.com/questions/9153598/how-do-i-fetch-a-branch-on-someone-elses-fork-on-github"},"Source")),(0,l.kt)("p",null,"When needing to work with a new branch on a forked repo you have to create a new branch in your local fork that references that branch. This can be accomplished by:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git remote add theirUsername git@github.com:theirUsername/repoName.git\ngit fetch theirUsername\ngit checkout -b my_name_for_their_branch theirUsername/theirBranch\n")),(0,l.kt)("h3",null,"Example"),(0,l.kt)("p",null,"Following directions for ",(0,l.kt)("a",{parentName:"p",href:"https://github.ibm.com/MFPSamples/DevCenter/wiki/Keep-fork-in-sync"},"Keeping your fork in sync")," for the DevCetner."),(0,l.kt)("p",null,"In this example I will be demonstrating creating a ",(0,l.kt)("inlineCode",{parentName:"p"},"GA")," branch from ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream"),", in my local environment. I will be prefixing the remote ",(0,l.kt)("inlineCode",{parentName:"p"},"GA")," branch with my initials to have a differentiation between the ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream")," branch and my local (forked) copy."),(0,l.kt)("p",null,"You can set ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream")," as the repo to follow (",(0,l.kt)("strong",{parentName:"p"},"userName"),")"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"git remote add upstream git@github.ibm.com:MFPSamples/DevCenter\n")),(0,l.kt)("p",null,"Once this is done your are free to ",(0,l.kt)("inlineCode",{parentName:"p"},"fetch")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"pull")," code from the ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream")," witch is the source repo for all changes (representing another ",(0,l.kt)("strong",{parentName:"p"},"userName"),")."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"git fetch upstream\ngit merge upstream/master\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Note:")," This is assuming you are trying to merge to you local (forked) ",(0,l.kt)("inlineCode",{parentName:"p"},"master")," branch"),(0,l.kt)("p",null,"If you need to work off a branch that is in the ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream")," but not in your local repository (forked) you can create it with a link to upstream as follows:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"git checkout -b ENG-GA upstream/GA\n")),(0,l.kt)("p",null,"This line creates a local branch ",(0,l.kt)("inlineCode",{parentName:"p"},"ENG-GA")," based on ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream/GA"),". So now you can make updates to your local repo ",(0,l.kt)("inlineCode",{parentName:"p"},"ENG-GA")," and then push it back to ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream/GA")," which should help reduce merge conflicts. You still want to be sure to keep your local (forked) branch up to date if your changes will happen over time. Periodically you will need to merge ",(0,l.kt)("inlineCode",{parentName:"p"},"upstream/GA")," with the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"git fetch upstream\ngit merge upstream/GA\n")),(0,l.kt)("p",null,"Once you are ready to submit your changes back to upstream you can create a pull request via ",(0,l.kt)("a",{parentName:"p",href:"github.ibm.com"},(0,l.kt)("em",{parentName:"a"},"github.com")),". Ensuring that your base branch is ",(0,l.kt)("inlineCode",{parentName:"p"},"GA")," and the head branch is ",(0,l.kt)("inlineCode",{parentName:"p"},"ENG-GA"),". See image for details."),(0,l.kt)("img",{src:"../forking/git-pull-request.png",alt:"Pull Request"}),(0,l.kt)("h2",null,".gitignore"),(0,l.kt)("h3",null,"Untracking a single file"),(0,l.kt)("p",null,"To untrack a single file that has already been added/initialized to your repository, i.e., stop tracking the file but not delete it from your system use:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git rm --cached filename\n")),(0,l.kt)("h3",null,"Untracking all files"),(0,l.kt)("p",null,"To untrack every file that is now in your ",(0,l.kt)("strong",{parentName:"p"},".gitignore"),":"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Commit any outstanding code changes, and then, run this command:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'git commit -m "Commit message"\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"This removes any changed files from the index(staging area), then just run:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git rm -r --cached .\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Add all tracked changes"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git add .\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Commit it:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'git commit -m ".gitignore is now working"\n')))),(0,l.kt)("h2",null,"Merge conflicts"),(0,l.kt)("h3",null,"Local changes to same files"),(0,l.kt)("p",null,"To resolve merge conflicts with error."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"error: Your local changes to the following files would be overwritten by merge:\n")),(0,l.kt)("p",null,"To stash entire working tree"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git stash save --keep-index\n")),(0,l.kt)("p",null,"Now you will be able to merge branch successfully"),(0,l.kt)("p",null,"If you do not need your local changes you can simple drop the stash"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git stash drop\n")),(0,l.kt)("p",null,"or…if you need your changes you can attempt to process them in now using pop"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git stash pop\n")),(0,l.kt)("p",null,"To show what is in your stash use show"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git stash show\n")),(0,l.kt)("h2",null,"Undoing commits"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit"},"source")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'git commit -m "Something terribly misguided"\ngit reset --soft HEAD~\n# << edit files as necessary >>\ngit add ...\ngit commit -m "New commit message"\ngit commit -c ORIG_HEAD\n')),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"http://stackoverflow.com/questions/3197413/how-do-i-delete-unpushed-git-commits"},"source")),(0,l.kt)("p",null,"Delete the most recent commit, keeping the work you’ve done:"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"git reset --soft HEAD~1")),(0,l.kt)("p",null,"Delete the most recent commit, destroying the work you’ve done:"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"git reset --hard HEAD~1")),(0,l.kt)("h2",null,"Other Configurations"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"git config --global core.trustctime false\n")),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://stackoverflow.com/a/21891017/2218959"},"source")))}g.isMDXComponent=!0},4295:function(e,t,a){a.d(t,{Z:function(){return w}});var n=a(7294),l=a(8650),r=a.n(l),o=a(5444),i=a(5426),s=a(5885),c=a(5900),m=a.n(c),p=function(e){var t,a=e.title,l=e.theme,r=e.tabs,o=void 0===r?[]:r;return n.createElement("div",{className:m()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=o.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===l,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},u=function(e){var t=e.relativePagePath,a=e.repository,l=(0,o.useStaticQuery)("1364590287").site.siteMetadata.repository,r=a||l,i=r.baseUrl,s=r.subDirectory,c=i+"/edit/"+r.branch+s+"/src/pages"+t;return i?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:c},"Edit this page on GitHub"))):null},h=a(4275),d=a(1721),g=function(e){function t(){return e.apply(this,arguments)||this}return(0,d.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,l=e.slug,i=l.split("/").filter(Boolean).slice(-1)[0],s=a.map((function(e){var t,a=r()(e,{lower:!0,strict:!0}),s=a===i,c=new RegExp(i+"/?(#.*)?$"),p=l.replace(c,a);return n.createElement("li",{key:e,className:m()((t={},t["PageTabs-module--selected-item--aBB0K"]=s,t),"PageTabs-module--list-item--024o6")},n.createElement(o.Link,{className:"PageTabs-module--link--Kz-7R",to:""+p},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},s))))))},t}(n.Component),k=g,f=a(2881),N=a(6958),b=a(36),y=function(e){var t=e.date,a=new Date(t);return t?n.createElement(b.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(b.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},w=function(e){var t=e.pageContext,a=e.children,l=e.location,c=e.Title,m=t.frontmatter,d=void 0===m?{}:m,g=t.relativePagePath,b=t.titleType,w=d.tabs,v=d.title,E=d.theme,x=d.description,C=d.keywords,T=d.date,A=(0,N.Z)().interiorTheme,L=(0,o.useStaticQuery)("2456312558").site.pathPrefix,P=L?l.pathname.replace(L,""):l.pathname,I=w?P.split("/").filter(Boolean).slice(-1)[0]||r()(w[0],{lower:!0}):"",D=E||A;return n.createElement(s.Z,{tabs:w,homepage:!1,theme:D,pageTitle:v,pageDescription:x,pageKeywords:C,titleType:b},n.createElement(p,{title:c?n.createElement(c,null):v,label:"label",tabs:w,theme:D}),w&&n.createElement(k,{title:v,slug:P,tabs:w,currentTab:I}),n.createElement(f.Z,{padded:!0},a,n.createElement(u,{relativePagePath:g}),n.createElement(y,{date:T})),n.createElement(h.Z,{pageContext:t,location:l,slug:P,tabs:w,currentTab:I}),n.createElement(i.Z,null))}}}]);
//# sourceMappingURL=component---src-pages-code-notes-git-mdx-94b25bf988e8041d3578.js.map
"use client"

import { Share2, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose as DialogPrimitiveClose
} from "@/components/ui/dialog"
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton
} from "react-share"
import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share"

function ShareToSocialMedia({
  title,
  description
}: {
  title: string
  description?: string
}) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (window && typeof window !== "undefined")
      setUrl(`${window?.location?.protocol}//${window?.location?.host}`)
  }, [])

  useEffect(() => {
    if (!copied) return

    const timer = setTimeout(() => {
      setCopied(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [copied])

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-4 cursor-pointer"
      >
        <Share2 />
        Share
      </button>

      <DialogContent
        className=" w-[600px] max-w-[600px] min-w-[600px]"
        showCloseButton={false}
      >
        <DialogPrimitiveClose
          type="button"
          className={`absolute top-4 ${"right-4"} 
            rounded-xs opacity-70 transition-opacity hover:opacity-100`}
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitiveClose>
        <DialogHeader className={""}>
          <DialogTitle className={" text-[#192F59] font-semibold text-2xl"}>
            {title}
          </DialogTitle>
          <DialogDescription className={""}>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between gap-4 px-8">
          <div className="flex flex-col items-center gap-2">
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon size={50} round />
            </WhatsappShareButton>
            <h1 className="text-base text-[#1D1734] ">Whatsapp</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FacebookShareButton
              url={url}
              //   quote={title}
              hashtag={""}
            >
              <FacebookIcon size={50} round />
            </FacebookShareButton>
            <h1 className="text-base text-[#1D1734] ">Facebook</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <LinkedinShareButton url={url} title={title} summary={description}>
              <LinkedinIcon size={50} round />
            </LinkedinShareButton>{" "}
            <h1 className="text-base text-[#1D1734] ">LinkedIn</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <EmailShareButton url={url} subject={title} body={description}>
              <EmailIcon size={50} round />
            </EmailShareButton>
            <h1 className="text-base text-[#1D1734] ">Email</h1>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareToSocialMedia

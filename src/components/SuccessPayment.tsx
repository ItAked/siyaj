"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckIcon } from "lucide-react"
import type { JSX } from "react/jsx-runtime"
import { assignSubscription } from "../../services/subscriptions"

interface PaymentSuccessProps {
  transactionId?: string
  amount?: string
  name?: string
}

export default function SuccessPayment({
  transactionId: defaultTransactionId = "TXN-2024-001234",
  amount: defaultAmount = "$99.99",
  name: defaultName = "test"
}: PaymentSuccessProps) {
  const searchParams = useSearchParams()
  const transactionId = searchParams.get('id') || defaultTransactionId
  const amount = searchParams.get('amount') ? `${searchParams.get('amount')}` : defaultAmount
  const name = searchParams.get('name') || defaultName
  const [paymentDate, setPaymentDate] = useState("")
  const [downloadStatus, setDownloadStatus] = useState("")
  const [confettiElements, setConfettiElements] = useState<JSX.Element[]>([])
  const router = useRouter()

  useEffect(() => {
    const now = new Date()
    const dateString = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    setPaymentDate(dateString)
    createConfetti()
  }, [])

  const createConfetti = () => {
    const colors = ["bg-green-500", "bg-red-400", "bg-teal-400", "bg-blue-400", "bg-yellow-400"]
    const confettiArray: JSX.Element[] = []
    for (let i = 0; i < 50; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const randomLeft = Math.random() * 100
      const randomDelay = Math.random() * 3
      const randomDuration = Math.random() * 3 + 2
      confettiArray.push(
        <div key={i} className={`absolute w-2 h-2 ${randomColor} animate-bounce opacity-0`} style={{left: `${randomLeft}%`, animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`, animation: `confetti-fall ${randomDuration}s linear infinite ${randomDelay}s`}}/>)
    }
    setConfettiElements(confettiArray)
    setTimeout(() => {
      setConfettiElements([])
    }, 5000)
  }
  const downloadReceipt = () => {
    const receiptContent = `Payment Receipt\n\nTransaction ID: ${transactionId}\nAmount: ${amount}\nDate: ${paymentDate}\nالتصنيف: ${name}`
    const link = document.createElement("a")
    link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(receiptContent)
    link.download = "payment-receipt.txt"
    link.click()
    setDownloadStatus("Downloaded!")
    setTimeout(() => {
      setDownloadStatus("")
    }, 2000)
  }
  const goHome = async () => {
    const form = new FormData()
    form.append('name', name)
    await assignSubscription(form)
    router.push('/practitioner/subscription')
  }
  return (
    <>
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes drawCheck {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          to {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out 0.3s both;
        }
        
        .animate-drawCheck {
          animation: drawCheck 0.8s ease-out 0.6s both;
        }
        
        .animate-fadeInUp-1 {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }
        
        .animate-fadeInUp-2 {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }
        
        .animate-fadeInUp-3 {
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }
        
        .animate-fadeInUp-4 {
          animation: fadeInUp 0.8s ease-out 1s both;
        }
        
        .animate-fadeInUp-5 {
          animation: fadeInUp 0.8s ease-out 1.2s both;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 flex items-center justify-center p-5" dir="rtl">
        <div className="bg-white rounded-3xl p-12 md:p-16 text-center shadow-2xl max-w-lg w-full relative overflow-hidden animate-slideUp">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
            {confettiElements}
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center animate-scaleIn">
                <CheckIcon className="w-10 h-10 text-white animate-drawCheck" strokeWidth={3} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-5 animate-fadeInUp-1 drop-shadow-sm">شكرًا لك</h1>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed animate-fadeInUp-3">تم إتمام عملية الدفع بنجاح. سيتم إرسال تأكيد الطلب إلى بريدك الإلكتروني قريباً.</p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8 animate-fadeInUp-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Transaction ID</span>
                    <span className="text-gray-800 font-semibold">{transactionId}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Date & Time</span>
                    <span className="text-gray-800 font-semibold">{paymentDate}</span>
                </div>
                <div className="flex justify-between items-center py-3 font-bold text-gray-800">
                    <span>Amount Paid</span>
                    <span>{(Number(amount) / 100).toFixed(2)} ريال</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-5">
                <button onClick={downloadReceipt} className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                ${ downloadStatus ? "bg-green-600 text-white" : "bg-green-500 hover:bg-green-600 text-white hover:shadow-green-500/30"}`}>
                {downloadStatus || "تحميل الفاتورة"}
                </button>
                <button onClick={goHome} className={`px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 transform
                hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/30`}>الرجوع إلى الصفحة الرئيسية</button>
            </div>
        </div>
      </div>
    </>
  )
}
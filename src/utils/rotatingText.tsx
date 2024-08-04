export default function RotatingText() {
  return (
    <div className="flex justify-center items-center text-3xl font-bold">
      <span className="inline gradient-text">
        <span className="inline-block opacity-0 animate-fadeInAndRotate">
          <p className="gradient-text">V</p>
        </span>
        eil Voice
      </span>
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-90deg);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .animate-fadeInAndRotate {
          animation: fadeIn 1s forwards, rotate 1s 0.5s forwards;
        }
      `}</style>
    </div>
  )
}

/* Paper + Pixel Atlas: infrastructure status is a quiet indexed signal, never a blocking gate. */
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, RotateCw } from "lucide-react";

type Status = "loading" | "success" | "error";

export default function ApiHealthStatus() {
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("배포 상태 확인 중");

  const checkHealth = async () => {
    setStatus("loading");
    setMessage("배포 상태 확인 중");
    try {
      const response = await fetch("/api/health", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
      setMessage("Vercel API 연결됨");
    } catch {
      setStatus("error");
      setMessage("API 연결을 확인할 수 없음 · 정적 데이터는 계속 이용 가능");
    }
  };

  useEffect(() => {
    void checkHealth();
  }, []);

  return <div className={`api-health api-health-${status}`} role="status" aria-live="polite">
    {status === "loading" && <LoaderCircle className="api-health-icon api-health-spin" size={14} aria-hidden="true" />}
    {status === "success" && <CheckCircle2 className="api-health-icon" size={14} aria-hidden="true" />}
    {status === "error" && <AlertCircle className="api-health-icon" size={14} aria-hidden="true" />}
    <span>{message}</span>
    {status === "error" && <button type="button" className="api-health-retry" onClick={() => void checkHealth()} aria-label="API 상태 다시 확인"><RotateCw size={13} /> 재시도</button>}
  </div>;
}

# 환경변수 없는 Vercel Cron 운영 메모

Vercel 공식 문서에 따르면 Cron은 production URL로 GET 요청을 보내며, 요청에는 `user-agent: vercel-cron/1.0`과 설정된 스케줄을 담은 `x-vercel-cron-schedule` 헤더가 포함된다. `CRON_SECRET`은 별도의 권장 보안 옵션이다.

이번 프로젝트는 사용자가 환경변수를 등록하지 못하는 제약 때문에 `CRON_SECRET`을 요구하지 않고, GET·전용 User-Agent·정확한 스케줄 헤더를 함께 확인한다. 이 방식은 일반적인 공개 호출을 줄이지만 암호학적 인증은 아니므로, 민감한 쓰기 작업에는 적합하지 않다. 아카이브 갱신은 공식 원문을 재수집하는 공개 데이터 작업으로 제한하고, 실제 운영에서 강한 인증이 필요해지면 CRON_SECRET을 다시 활성화한다.

출처: https://vercel.com/docs/cron-jobs
출처: https://vercel.com/docs/cron-jobs/manage-cron-jobs

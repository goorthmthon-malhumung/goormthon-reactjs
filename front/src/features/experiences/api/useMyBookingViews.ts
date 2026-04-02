import completedImageOne from "@/assets/my/completed-1.jpg";
import completedImageTwo from "@/assets/my/completed-2.jpg";
import { asObject, getNumber, getString } from "@/api/response-helpers";
import {
  useGetMyBookings,
  useGetMyCompletedBookings,
} from "@/api/generated/experience/experience";

export type UpcomingExperienceReservationView = {
  id: string;
  title: string;
  scheduleLabel: string;
  statusLabel: string;
  participantLabel: string;
};

export type CompletedExperienceHistoryView = {
  id: string;
  imageSrc: string;
  badgeLabel: string;
  badgeTone: "cyan" | "orange";
  title: string;
  mentorLabel: string;
  deadlineLabel: string;
  location: string;
};

const FALLBACK_UPCOMING_RESERVATIONS: readonly UpcomingExperienceReservationView[] =
  [
    {
      id: "fallback-experience-upcoming",
      title: "예약한 체험이 없습니다.",
      scheduleLabel: "새로운 체험이 생기면 이곳에 표시됩니다.",
      statusLabel: "안내",
      participantLabel: "",
    },
  ] as const;

const FALLBACK_COMPLETED_HISTORY: readonly CompletedExperienceHistoryView[] = [
  {
    id: "fallback-experience-completed",
    imageSrc: completedImageOne,
    badgeLabel: "완료 내역 없음",
    badgeTone: "cyan",
    title: "아직 완료한 체험이 없습니다.",
    mentorLabel: "체험 참여 후 이력이 쌓입니다.",
    deadlineLabel: "",
    location: "전허게",
  },
] as const;

function toRecordArray(source: unknown) {
  if (Array.isArray(source)) {
    return source;
  }

  const record = asObject(source);

  if (!record) {
    return [];
  }

  const candidateKeys = ["content", "items", "bookings", "reservations", "results"];

  for (const key of candidateKeys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function formatDateLabel(rawValue: string) {
  if (!rawValue) {
    return "";
  }

  const parsedDate = new Date(rawValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return rawValue;
  }

  return `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일`;
}

function formatScheduleLabel(source: unknown) {
  const explicitSchedule = getString(source, ["schedule"], "");

  if (explicitSchedule) {
    return explicitSchedule;
  }

  const startDate = getString(source, ["startDate", "experienceDate", "bookingDate"], "");
  const endDate = getString(source, ["endDate"], "");
  const timeLabel = getString(source, ["experienceTime", "time", "workHours"], "");
  const startDateLabel = formatDateLabel(startDate);
  const endDateLabel = formatDateLabel(endDate);

  if (startDateLabel && endDateLabel && startDateLabel !== endDateLabel) {
    return `${startDateLabel} ~ ${endDateLabel}`;
  }

  if (startDateLabel && timeLabel) {
    return `${startDateLabel} · ${timeLabel}`;
  }

  if (startDateLabel) {
    return startDateLabel;
  }

  return "일정 정보 준비중";
}

function formatParticipantLabel(source: unknown) {
  const currentParticipants = getNumber(
    source,
    ["participantCount", "currentParticipants", "reservedCount"],
    0,
  );
  const maxParticipants = getNumber(
    source,
    ["maxParticipants", "capacity"],
    0,
  );

  if (currentParticipants > 0 && maxParticipants > 0) {
    return `${currentParticipants}명/${maxParticipants}명`;
  }

  if (currentParticipants > 0) {
    return `${currentParticipants}명`;
  }

  return "";
}

function mapUpcomingReservation(
  source: unknown,
  index: number,
): UpcomingExperienceReservationView {
  const reservationId = getNumber(
    source,
    ["id", "bookingId", "reservationId"],
    index + 1,
  );

  return {
    id: String(reservationId),
    title: getString(
      source,
      ["experienceTitle", "title", "jobTitle"],
      `예약 ${reservationId}`,
    ),
    scheduleLabel: formatScheduleLabel(source),
    statusLabel: getString(
      source,
      ["status", "bookingStatus"],
      "예약확정",
    ),
    participantLabel: formatParticipantLabel(source),
  };
}

function mapCompletedHistory(
  source: unknown,
  index: number,
): CompletedExperienceHistoryView {
  const historyId = getNumber(
    source,
    ["id", "bookingId", "reservationId"],
    index + 1,
  );
  const completedAt = getString(
    source,
    ["completedAt", "endDate", "experienceDate"],
    "",
  );
  const imageSrc =
    getString(source, ["photoUrl", "imageUrl", "thumbnailUrl"], "") ||
    (index % 2 === 0 ? completedImageOne : completedImageTwo);

  return {
    id: String(historyId),
    imageSrc,
    badgeLabel: completedAt ? formatDateLabel(completedAt) : "체험 완료",
    badgeTone: index % 2 === 0 ? "cyan" : "orange",
    title: getString(
      source,
      ["experienceTitle", "title", "jobTitle"],
      `완료 내역 ${historyId}`,
    ),
    mentorLabel: getString(
      source,
      ["mentorName", "mentor", "name"],
      "멘토 정보 준비중",
    ),
    deadlineLabel: completedAt ? "완료" : "",
    location: getString(
      source,
      ["location", "address"],
      "제주도",
    ),
  };
}

export function useMyUpcomingExperienceReservations() {
  return useGetMyBookings<UpcomingExperienceReservationView[]>({
    query: {
      staleTime: 60_000,
      select: (response) => {
        const items = toRecordArray(response.data).map((item, index) =>
          mapUpcomingReservation(item, index),
        );

        return items.length > 0 ? items : [...FALLBACK_UPCOMING_RESERVATIONS];
      },
    },
  });
}

export function useMyCompletedExperienceHistory() {
  return useGetMyCompletedBookings<CompletedExperienceHistoryView[]>({
    query: {
      staleTime: 60_000,
      select: (response) => {
        const items = toRecordArray(response.data).map((item, index) =>
          mapCompletedHistory(item, index),
        );

        return items.length > 0 ? items : [...FALLBACK_COMPLETED_HISTORY];
      },
    },
  });
}

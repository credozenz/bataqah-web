interface VideoLinkProps {
  href: string;
}

export default function VideoLink({ href }: VideoLinkProps) {
  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden">
      <iframe
        src={href}
        style={{
          width: '100%',
          height: '100%',
          border: '0',
        }}
        allowFullScreen
        title="YouTube video player"
      />
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Definimos una interfaz para las propiedades del miembro del equipo
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center max-w-lg w-full"
      variants={cardVariants}
    >
      <div className="p-6 md:p-4 flex-shrink-0">
        {member.imageUrl && (
          <Image src={member.imageUrl} alt={member.name} width={128} height={128} className="rounded-full object-cover w-32 h-32" />
        )}
      </div>
      <div className="p-6 pt-0 md:pt-6 md:pl-0 text-center md:text-left">
        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
        <p className="text-[#9c00ff] font-semibold text-sm mb-3">{member.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
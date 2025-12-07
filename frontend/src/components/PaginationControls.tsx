import React from 'react';

interface PaginationControlsProps {
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    onNext: () => void;
    onPrev: () => void;
    total: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, hasNext, hasPrev, onNext, onPrev, total }) => {
    return (
        <div className="flex justify-end items-center gap-4 mt-4 text-sm">
            <span className="text-gray-500">Page {currentPage} (Total {total})</span>
            <div className="flex gap-2">
                <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;
